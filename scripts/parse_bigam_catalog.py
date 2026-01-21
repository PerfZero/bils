#!/usr/bin/env python3
import argparse
import json
import re
import os
import shutil
import subprocess
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path


CATEGORY_IMAGE_CACHE = {}

VOID_TAGS = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}


class Node:
    def __init__(self, tag, attrs):
        self.tag = tag
        self.attrs = dict(attrs)
        self.children = []
        self.text = []


class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__()
        self.root = Node("root", {})
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]
                break

    def handle_data(self, data):
        if data.strip():
            self.stack[-1].text.append(data)


def has_class(node, class_name):
    classes = node.attrs.get("class", "")
    return class_name in classes.split()


def text_content(node):
    parts = list(node.text)
    for child in node.children:
        parts.append(text_content(child))
    return "".join(parts).strip()


def find_all(node, predicate):
    matches = []
    if predicate(node):
        matches.append(node)
    for child in node.children:
        matches.extend(find_all(child, predicate))
    return matches


def find_first(node, predicate):
    if predicate(node):
        return node
    for child in node.children:
        found = find_first(child, predicate)
        if found:
            return found
    return None


def parse_number(value):
    if value is None:
        return None
    cleaned = re.sub(r"[^\d.,-]", "", value)
    if not cleaned:
        return None
    cleaned = cleaned.replace(",", ".")
    if "." in cleaned:
        try:
            return float(cleaned)
        except ValueError:
            return None
    try:
        return int(cleaned)
    except ValueError:
        return None


def parse_bool(value, default=True):
    if value is None:
        return default
    return str(value).lower() in {"1", "true", "yes", "y"}


def extract_seo_text(node):
    style = node.attrs.get("style", "")
    match = re.search(r"--seo-text:\s*['\"]([^'\"]*)['\"]", style)
    if not match:
        return None
    return match.group(1).strip()


def extract_inner_html_by_match(html, tag, match):
    if not match:
        return None
    start = match.end()
    depth = 1
    pattern = re.compile(rf"</?{tag}\b", re.I)
    for tag_match in pattern.finditer(html, start):
        snippet = html[tag_match.start() : tag_match.start() + 2]
        if snippet == "</":
            depth -= 1
        else:
            depth += 1
        if depth == 0:
            return html[start:tag_match.start()].strip()
    return None


def extract_inner_html_by_class(html, tag, class_name):
    pattern = re.compile(
        rf"<{tag}\b[^>]*class=[\"'][^\"']*{re.escape(class_name)}[^\"']*[\"'][^>]*>",
        re.I,
    )
    match = pattern.search(html)
    return extract_inner_html_by_match(html, tag, match)


def extract_all_inner_html_by_class(html, tag, class_name):
    pattern = re.compile(
        rf"<{tag}\b[^>]*class=[\"'][^\"']*{re.escape(class_name)}[^\"']*[\"'][^>]*>",
        re.I,
    )
    matches = []
    for match in pattern.finditer(html):
        inner_html = extract_inner_html_by_match(html, tag, match)
        if inner_html:
            matches.append(inner_html)
    return matches


def extract_inner_html_by_id(html, tag, element_id):
    pattern = re.compile(
        rf"<{tag}\b[^>]*id=[\"']{re.escape(element_id)}[\"'][^>]*>",
        re.I,
    )
    match = pattern.search(html)
    return extract_inner_html_by_match(html, tag, match)


def normalize_url(url, base_url):
    if not url:
        return None
    if url.startswith("//"):
        return f"https:{url}"
    if url.startswith("/"):
        return f"{base_url.rstrip('/')}{url}"
    return url


def extract_product_id(product_node):
    sku_node = find_first(product_node, lambda n: "sku-id" in n.attrs)
    if sku_node:
        return sku_node.attrs.get("sku-id")
    title_link = find_first(
        product_node,
        lambda n: n.tag == "a" and has_class(n, "product-card-line-tile__title"),
    )
    if title_link:
        href = title_link.attrs.get("href", "")
        match = re.search(r"-(\d+)/?$", href)
        if match:
            return match.group(1)
    return None


def extract_images(product_node, base_url, product_name, product_id):
    container = find_first(
        product_node,
        lambda n: n.tag == "div"
        and has_class(n, "product-card-line-tile__picture-container"),
    )
    if not container:
        return []
    images = []
    for img in find_all(container, lambda n: n.tag == "img"):
        url = img.attrs.get("data-src") or img.attrs.get("src")
        if not url or "no_picture" in url:
            continue
        images.append(
            {
                "id": f"{product_id}-{len(images)}" if product_id else f"img-{len(images)}",
                "url": normalize_url(url, base_url),
                "alt": img.attrs.get("alt") or product_name or "",
                "is_main": len(images) == 0,
            }
        )
    return images


def extract_category_cards(html, base_url):
    parser = TreeBuilder()
    parser.feed(html)
    lists = find_all(
        parser.root,
        lambda n: n.tag == "ul" and has_class(n, "a-catalog-list__list"),
    )
    categories = []
    for catalog_list in lists:
        cards = find_all(
            catalog_list,
            lambda n: n.tag == "a" and has_class(n, "a-catalog-card"),
        )
        for card in cards:
            href = normalize_url(card.attrs.get("href"), base_url)
            name_node = find_first(
                card, lambda n: n.tag == "div" and has_class(n, "a-catalog-card__text")
            )
            image_node = find_first(card, lambda n: n.tag == "img")
            image = None
            if image_node:
                image = image_node.attrs.get("data-src") or image_node.attrs.get("src")
            name = text_content(name_node) if name_node else None
            slug = slug_from_href(href, base_url, allow_product=False) if href else None
            if not href or not slug:
                continue
            categories.append(
                {
                    "name": name.strip() if name else None,
                    "href": href,
                    "slug": slug,
                    "image": normalize_url(image, base_url) if image else None,
                }
            )
    return categories


def extract_category_cards_from_nuxt(html, base_url):
    if not shutil.which("node"):
        return []
    node_script = r"""
const fs = require('fs');
const vm = require('vm');

const baseUrl = process.env.BASE_URL || '';
const html = fs.readFileSync(0, 'utf8');
const start = html.indexOf('window.__NUXT__');
if (start === -1) {
  console.log('[]');
  process.exit(0);
}
const end = html.indexOf('</script>', start);
const script = html.slice(start, end);
const context = { window: {} };
vm.createContext(context);
try {
  vm.runInContext(script, context, { timeout: 1000 });
} catch (err) {
  console.log('[]');
  process.exit(0);
}

const nuxt = context.window.__NUXT__;
const results = [];
const seen = new Set();

const normalize = (url) => {
  if (!url) return null;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return baseUrl.replace(/\/$/, '') + url;
  return url;
};

const visit = (node) => {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach(visit);
    return;
  }
  const href = node.href || node.url || node.link;
  const image = node.image || node.picture || node.img || node.photo;
  if (typeof href === 'string' && href.includes('/catalog/') && typeof image === 'string') {
    const normalizedHref = normalize(href);
    const normalizedImage = normalize(image);
    const name = node.name || node.title || node.text;
    if (normalizedHref && normalizedImage) {
      const key = normalizedHref + '|' + normalizedImage;
      if (!seen.has(key)) {
        seen.add(key);
        results.push({ name: name || null, href: normalizedHref, image: normalizedImage });
      }
    }
  }
  Object.values(node).forEach(visit);
};

visit(nuxt);
console.log(JSON.stringify(results));
"""
    try:
        result = subprocess.run(
            ["node", "-e", node_script],
            input=html,
            text=True,
            capture_output=True,
            timeout=10,
            env={**os.environ, "BASE_URL": base_url},
        )
    except Exception:
        return []
    if result.returncode != 0:
        return []
    try:
        payload = json.loads(result.stdout.strip() or "[]")
    except json.JSONDecodeError:
        return []
    categories = []
    for item in payload:
        if not isinstance(item, dict):
            continue
        href = item.get("href")
        slug = slug_from_href(href, base_url, allow_product=False) if href else None
        if not slug:
            continue
        categories.append(
            {
                "name": item.get("name"),
                "href": href,
                "slug": slug,
                "image": item.get("image"),
            }
        )
    return categories


def extract_attributes(product_node, product_id):
    props_container = find_first(
        product_node,
        lambda n: n.tag == "div"
        and has_class(n, "product-card-line-tile__props")
        and find_first(
            n,
            lambda c: c.tag == "span"
            and has_class(c, "product-card-line-tile__prop-value"),
        ),
    )
    if not props_container:
        return []
    attributes = []
    for idx, child in enumerate(
        [c for c in props_container.children if c.tag == "div"]
    ):
        name_span = find_first(child, lambda n: n.tag == "span" and not has_class(n, "product-card-line-tile__prop-value"))
        value_span = find_first(child, lambda n: n.tag == "span" and has_class(n, "product-card-line-tile__prop-value"))
        name = extract_seo_text(name_span) if name_span else None
        value = extract_seo_text(value_span) if value_span else None
        if not name and not value:
            continue
        if name:
            name = name.rstrip(":").strip()
        attributes.append(
            {
                "id": f"{product_id}-attr-{idx}" if product_id else f"attr-{idx}",
                "name": name,
                "value": value,
            }
        )
    return attributes


def extract_complectation_items(root_node):
    complectation_sections = find_all(
        root_node,
        lambda n: n.tag in {"section", "div"}
        and has_class(n, "a-product-tabs__set"),
    )
    if not complectation_sections:
        complectation_sections = find_all(
            root_node,
            lambda n: n.tag in {"section", "div"}
            and has_class(n, "a-page-detail__set"),
        )
    items = []
    for section in complectation_sections:
        rows = find_all(
            section,
            lambda n: n.tag == "tr" and has_class(n, "a-parameters__item"),
        )
        for idx, row in enumerate(rows, start=len(items)):
            name_node = find_first(
                row,
                lambda n: n.tag == "div"
                and has_class(n, "a-parameters__name-text"),
            )
            value_node = find_first(
                row, lambda n: n.tag == "td" and has_class(n, "a-parameters__value")
            )
            name = text_content(name_node) if name_node else None
            quantity = text_content(value_node) if value_node else None
            if not name:
                continue
            items.append(
                {
                    "id": f"set-{idx}",
                    "name": name.strip(),
                    "quantity": quantity.strip() if quantity else "",
                    "order": idx,
                }
            )
    return items


def extract_documents_section(parser_root):
    documents_section = find_first(
        parser_root,
        lambda n: n.tag == "li"
        and (n.attrs.get("id") == "documents" or has_class(n, "a-product-tabs__sections-item--documents")),
    )
    return documents_section


def extract_documents(parser_root, base_url):
    documents_section = extract_documents_section(parser_root)
    if not documents_section:
        return []
    links = find_all(
        documents_section,
        lambda n: n.tag == "a" and has_class(n, "a-product-tabs__file-link"),
    )
    documents = []
    for idx, link in enumerate(links):
        href = normalize_url(link.attrs.get("href"), base_url)
        if not href:
            continue
        title_node = find_first(
            link, lambda n: n.tag == "div" and has_class(n, "a-file__name")
        )
        origin_node = find_first(
            link, lambda n: n.tag == "div" and has_class(n, "a-file__origin")
        )
        title = text_content(title_node) if title_node else link.attrs.get("title")
        origin = text_content(origin_node) if origin_node else None
        documents.append(
            {
                "id": f"doc-{idx}",
                "title": title.strip() if title else None,
                "url": href,
                "origin": origin.strip() if origin else None,
            }
        )
    return documents


def extract_documents_auto_text(parser_root):
    documents_section = extract_documents_section(parser_root)
    if not documents_section:
        return None
    text_node = find_first(
        documents_section,
        lambda n: n.tag == "div" and has_class(n, "a-product-tabs__autotext"),
    )
    if not text_node:
        return None
    return text_content(text_node) or None


def extract_gallery_images(root_node, base_url, product_name):
    gallery = find_first(
        root_node,
        lambda n: n.tag == "div" and has_class(n, "a-gallery-carousel__gallery"),
    )
    images = []
    seen = set()

    def add_image(url):
        if not url:
            return
        normalized = normalize_url(url, base_url)
        if not normalized or normalized in seen:
            return
        seen.add(normalized)
        images.append(
            {
                "id": f"gallery-{len(images)}",
                "url": normalized,
                "alt": product_name or "",
                "is_main": len(images) == 0,
            }
        )

    if gallery:
        for img in find_all(gallery, lambda n: n.tag == "img"):
            url = img.attrs.get("data-src") or img.attrs.get("src")
            if url and "no_picture" not in url:
                add_image(url)

    thumbs = find_first(
        root_node,
        lambda n: n.tag == "div" and has_class(n, "a-gallery-carousel__thumbs"),
    )
    if thumbs:
        for card in find_all(
            thumbs, lambda n: n.tag == "div" and has_class(n, "a-picture-card")
        ):
            add_image(card.attrs.get("full"))
        for img in find_all(thumbs, lambda n: n.tag == "img"):
            url = img.attrs.get("data-src") or img.attrs.get("src")
            if url and "no_picture" not in url:
                add_image(url)

    return images


def extract_code(product_node):
    code_span = find_first(
        product_node,
        lambda n: n.tag == "span"
        and has_class(n, "product-card-line-tile__props--no-margin"),
    )
    if not code_span:
        return None
    raw = extract_seo_text(code_span)
    if not raw:
        return None
    raw = raw.strip()
    if raw.lower().startswith("код"):
        raw = raw.split(":", 1)[-1].strip()
    return raw or None


def extract_price_block(product_node):
    price_container = find_first(
        product_node,
        lambda n: n.tag == "div" and has_class(n, "product-card-line-tile__price"),
    )
    price_block = None
    if price_container:
        price_block = find_first(
            price_container, lambda n: n.tag == "div" and has_class(n, "a-price")
        )
    if not price_block:
        price_block = find_first(
            product_node, lambda n: n.tag == "div" and has_class(n, "a-price")
        )
    if not price_block:
        return {}
    current_node = find_first(
        price_block,
        lambda n: n.tag == "div"
        and (has_class(n, "a-price__new") or has_class(n, "a-price__current")),
    )
    old_node = find_first(
        price_block, lambda n: n.tag == "div" and has_class(n, "a-price__old")
    )
    current_price = parse_number(text_content(current_node)) if current_node else None
    old_price = parse_number(text_content(old_node)) if old_node else None
    discount_value = parse_number(price_block.attrs.get("discount"))
    min_bonus_price = parse_number(price_block.attrs.get("minbonusprice"))
    show_personal_price_difference = parse_bool(
        price_block.attrs.get("showpersonalpricedifference"), default=True
    )
    retail_price = parse_number(price_block.attrs.get("retail")) or old_price
    discount_percent = None
    if retail_price and current_price and retail_price > 0:
        discount_percent = int(round((retail_price - current_price) / retail_price * 100))
    return {
        "price": current_price,
        "retail_price": retail_price,
        "discount_percent": discount_percent if discount_percent is not None else 0,
        "min_bonus_price": min_bonus_price,
        "show_personal_price_difference": show_personal_price_difference,
    }


def parse_products(html, base_url, limit=None, page_url=None):
    parser = TreeBuilder()
    parser.feed(html)
    product_nodes = find_all(
        parser.root,
        lambda n: n.tag == "li" and has_class(n, "a-product-list__item"),
    )

    category = extract_category_context(html, base_url, page_url=page_url)

    products = []
    for node in product_nodes:
        title_link = find_first(
            node, lambda n: n.tag == "a" and has_class(n, "product-card-line-tile__title")
        )
        name = text_content(title_link) if title_link else None
        href = title_link.attrs.get("href") if title_link else None
        href = normalize_url(href, base_url)

        reviews_link = find_first(
            node, lambda n: n.tag == "a" and has_class(n, "product-card-line-tile__status")
        )
        reviews_href = normalize_url(
            reviews_link.attrs.get("href") if reviews_link else None, base_url
        )

        product_id = extract_product_id(node)
        code = extract_code(node)
        images = extract_images(node, base_url, name, product_id)
        image = images[0]["url"] if images else None

        price_data = extract_price_block(node)

        products.append(
            {
                "id": product_id,
                "code": code,
                "name": name,
                "href": href,
                "reviews_href": reviews_href,
                "price": price_data.get("price"),
                "retail_price": price_data.get("retail_price"),
                "discount_percent": price_data.get("discount_percent"),
                "min_bonus_price": price_data.get("min_bonus_price"),
                "show_personal_price_difference": price_data.get(
                    "show_personal_price_difference"
                ),
                "image": image,
                "images": images,
                "category": category,
            }
        )
        if limit and len(products) >= limit:
            break

    return products


def fetch_html(url):
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; BigamParser/1.0)",
            "Accept": "text/html,application/xhtml+xml",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def extract_meta_image(html, base_url):
    patterns = [
        r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+name=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+property=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']',
    ]
    for pattern in patterns:
        match = re.search(pattern, html, re.I)
        if match:
            return normalize_url(match.group(1), base_url)
    return None


def get_category_image(href, base_url):
    if not href:
        return None
    cache_key = href
    if cache_key in CATEGORY_IMAGE_CACHE:
        return CATEGORY_IMAGE_CACHE[cache_key]
    image = None
    try:
        html = fetch_html(href)
        image = extract_meta_image(html, base_url)
    except Exception:
        image = None
    CATEGORY_IMAGE_CACHE[cache_key] = image
    return image


def parse_product_page(html, base_url, page_url=None):
    parser = TreeBuilder()
    parser.feed(html)

    name_node = find_first(
        parser.root,
        lambda n: n.tag == "h1" and has_class(n, "a-page-detail__title"),
    )
    name = text_content(name_node) if name_node else None
    gallery_images = extract_gallery_images(parser.root, base_url, name)
    main_image = gallery_images[0]["url"] if gallery_images else None

    article = None
    code = None
    for block in find_all(
        parser.root,
        lambda n: n.tag == "div" and has_class(n, "a-page-detail__vendor-code"),
    ):
        label = extract_vendor_label(block)
        label_text = label.lower() if label else ""
        value_node = find_first(
            block,
            lambda n: n.tag == "span"
            and has_class(n, "a-page-detail__vendor-code-value"),
        )
        value = None
        if value_node:
            value = extract_seo_text(value_node) or text_content(value_node)
            value = value.strip() if value else None
        if not value:
            continue
        if "артикул" in label_text:
            article = value
        elif "код" in label_text:
            code = value

    reviews_link = find_first(
        parser.root,
        lambda n: n.tag == "a" and has_class(n, "a-page-detail__reviews"),
    )
    reviews_href = normalize_url(
        reviews_link.attrs.get("href") if reviews_link else None, base_url
    )

    price_data = extract_detail_price(parser.root)

    brand = None
    attributes = []
    parameters_candidates = find_all(
        parser.root,
        lambda n: n.tag in {"section", "div"}
        and has_class(n, "a-product-tabs__parameters"),
    )
    features_section = None
    if parameters_candidates:
        max_rows = 0
        for candidate in parameters_candidates:
            rows = find_all(
                candidate,
                lambda n: n.tag == "tr" and has_class(n, "a-parameters__item"),
            )
            if len(rows) > max_rows:
                max_rows = len(rows)
                features_section = candidate
    if not features_section:
        feature_candidates = []
        feature_candidates.extend(
            find_all(
                parser.root,
                lambda n: n.tag == "section"
                and has_class(n, "a-page-detail__features"),
            )
        )
        feature_candidates.extend(
            find_all(
                parser.root,
                lambda n: n.tag == "li"
                and (
                    n.attrs.get("id") == "specification"
                    or has_class(n, "a-product-tabs__sections-item--specification")
                ),
            )
        )
        feature_candidates.extend(
            find_all(
                parser.root,
                lambda n: n.tag in {"section", "div"}
                and has_class(n, "a-product-tabs__column--features"),
            )
        )
        features_section = None
        max_rows = 0
        for candidate in feature_candidates:
            rows = find_all(
                candidate,
                lambda n: n.tag == "tr" and has_class(n, "a-parameters__item"),
            )
            if len(rows) > max_rows:
                max_rows = len(rows)
                features_section = candidate
    if features_section:
        rows = find_all(
            features_section,
            lambda n: n.tag == "tr" and has_class(n, "a-parameters__item"),
        )
        for row in rows:
            name_node = find_first(
                row, lambda n: n.tag == "div" and has_class(n, "a-parameters__name-text")
            )
            value_node = find_first(
                row, lambda n: n.tag == "td" and has_class(n, "a-parameters__value")
            )
            attr_name = text_content(name_node) if name_node else None
            attr_name = attr_name.strip() if attr_name else None
            if not attr_name:
                continue
            if attr_name.lower() == "производитель":
                brand_link = find_first(
                    value_node, lambda n: n.tag == "a" and has_class(n, "a-parameters__manufacturer")
                )
                if brand_link:
                    img = find_first(brand_link, lambda n: n.tag == "img")
                    logo = None
                    if img:
                        logo = img.attrs.get("data-src") or img.attrs.get("src")
                    brand = {
                        "name": (img.attrs.get("alt") if img else text_content(brand_link)).strip(),
                        "href": normalize_url(brand_link.attrs.get("href"), base_url),
                        "logo": normalize_url(logo, base_url),
                    }
                else:
                    brand_text = text_content(value_node) if value_node else ""
                    brand_text = brand_text.strip()
                    if brand_text:
                        brand = {"name": brand_text, "href": None, "logo": None}
                continue
            attr_value = text_content(value_node) if value_node else None
            attr_value = attr_value.strip() if attr_value else None
            if attr_value:
                attributes.append({"name": attr_name, "value": attr_value})

    description_tab_html = extract_inner_html_by_id(html, "li", "description")
    if not description_tab_html:
        description_tab_html = extract_inner_html_by_id(html, "section", "description")
    description_html = None
    if description_tab_html:
        description_html = extract_inner_html_by_class(
            description_tab_html, "div", "a-page-detail__inner"
        )
    if not description_html:
        description_html = extract_inner_html_by_class(
            html, "div", "a-page-detail__inner"
        )

    page_auto_text = extract_inner_html_by_class(
        html, "div", "a-page-detail__autotext"
    )
    tabs_auto_text = extract_all_inner_html_by_class(
        html, "div", "a-product-tabs__autotext"
    )

    complectation_items = extract_complectation_items(parser.root)
    documents = extract_documents(parser.root, base_url)
    documents_auto_text = extract_documents_auto_text(parser.root)
    if not documents_auto_text:
        documents_tab_html = extract_inner_html_by_id(html, "li", "documents")
        if documents_tab_html:
            documents_auto_text = extract_inner_html_by_class(
                documents_tab_html, "div", "a-product-tabs__autotext"
            )

    breadcrumbs = extract_breadcrumb_jsonld(html, base_url)
    if not breadcrumbs:
        breadcrumbs = extract_breadcrumb_dom(html, base_url)
    category = derive_category_from_breadcrumbs(breadcrumbs, base_url)

    slug = slug_from_href(page_url, base_url, allow_product=True) if page_url else None

    return {
        "name": name,
        "article": article,
        "code": code,
        "price": price_data.get("price"),
        "retail_price": price_data.get("retail_price"),
        "discount_percent": price_data.get("discount_percent"),
        "description_full": description_html,
        "auto_text": page_auto_text,
        "tabs_auto_text": tabs_auto_text,
        "image": main_image,
        "images": gallery_images,
        "href": page_url,
        "reviews_href": reviews_href,
        "slug": slug,
        "brand": brand,
        "attributes": attributes,
        "complectation_items": complectation_items,
        "documents": documents,
        "documents_auto_text": documents_auto_text,
        "category": category,
        "breadcrumbs": breadcrumbs,
    }


def extract_category_context(html, base_url, page_url=None):
    breadcrumb = extract_breadcrumb_jsonld(html, base_url)
    if not breadcrumb:
        breadcrumb = extract_breadcrumb_dom(html, base_url)
    if not breadcrumb:
        return None
    breadcrumb = [
        {
            **item,
            "slug": item.get("slug")
            or slug_from_href(item.get("href"), base_url, allow_product=False),
        }
        for item in breadcrumb
    ]
    last = breadcrumb[-1]
    href = last.get("href")
    slug = last.get("slug")
    if not slug and page_url:
        slug = slug_from_href(page_url, base_url, allow_product=False)
    if not href and slug:
        href = f"{base_url.rstrip('/')}/catalog/{slug}/"
    if not href:
        href = page_url
    image = get_category_image(href, base_url) if href else None
    return {
        "name": last.get("name"),
        "href": href,
        "slug": slug,
        "image": image,
        "path": breadcrumb,
    }


def extract_breadcrumb_jsonld(html, base_url):
    matches = re.findall(
        r"<script[^>]+application/ld\\+json[^>]*>(.*?)</script>", html, re.S
    )
    for block in matches:
        try:
            data = json.loads(block)
        except json.JSONDecodeError:
            continue
        for item in normalize_jsonld(data):
            if item.get("@type") == "BreadcrumbList":
                return parse_breadcrumb_list(item, base_url)
    return []


def normalize_jsonld(data):
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        return [data]
    return []


def parse_breadcrumb_list(data, base_url):
    items = []
    for element in data.get("itemListElement", []):
        item = element.get("item") or {}
        href = item.get("@id")
        items.append(
            {
                "name": item.get("name"),
                "href": href,
                "slug": slug_from_href(href, base_url, allow_product=False),
            }
        )
    return items


def extract_breadcrumb_dom(html, base_url):
    parser = TreeBuilder()
    parser.feed(html)
    breadcrumbs = find_first(
        parser.root,
        lambda n: n.tag == "ul" and has_class(n, "a-breadcrumbs"),
    )
    if not breadcrumbs:
        return []
    items = []
    for item_node in breadcrumbs.children:
        if item_node.tag != "li":
            continue
        link = find_first(item_node, lambda n: n.tag == "a")
        if link:
            name = text_content(link)
            href = link.attrs.get("href")
        else:
            span = find_first(item_node, lambda n: n.tag == "span")
            name = text_content(span) if span else None
            href = None
        if name:
            items.append(
                {
                    "name": name,
                    "href": normalize_url(href, base_url) if href else None,
                    "slug": slug_from_href(href, base_url, allow_product=False)
                    if href
                    else None,
                }
            )
    return items


def slug_from_href(href, base_url, allow_product=False):
    if not href:
        return None
    if href.startswith("/"):
        href = f"{base_url.rstrip('/')}{href}"
    path = urllib.parse.urlparse(href).path.strip("/")
    if not path:
        return None
    match = re.search(r"catalog/([^/]+)", path)
    if match:
        return match.group(1)
    if allow_product:
        match = re.search(r"product/([^/]+)", path)
        if match:
            return match.group(1)
    return None


def derive_category_from_breadcrumbs(breadcrumbs, base_url):
    for item in reversed(breadcrumbs or []):
        href = item.get("href")
        if href and "/catalog/" in href:
            return {
                "name": item.get("name"),
                "href": href,
                "slug": slug_from_href(href, base_url, allow_product=False),
            }
    return None


def extract_vendor_label(block):
    for node in find_all(
        block, lambda n: n.tag in {"span", "div"} and has_class(n, "seo-text")
    ):
        label = extract_seo_text(node)
        if label:
            return label.strip()
    return text_content(block).strip()


def extract_detail_price(root_node):
    sidebar_price = find_first(
        root_node,
        lambda n: n.tag == "div" and has_class(n, "a-sidebar__price"),
    )
    price_block = None
    if sidebar_price:
        price_block = find_first(
            sidebar_price, lambda n: n.tag == "div" and has_class(n, "a-price")
        )
    if not price_block:
        return {"price": None, "retail_price": None, "discount_percent": 0}

    current_node = find_first(
        price_block,
        lambda n: n.tag == "div"
        and (has_class(n, "a-price__new") or has_class(n, "a-price__current")),
    )
    old_node = find_first(
        price_block, lambda n: n.tag == "div" and has_class(n, "a-price__old")
    )
    current_price = parse_number(text_content(current_node)) if current_node else None
    old_price = parse_number(text_content(old_node)) if old_node else None
    yandex_badge = find_first(
        root_node, lambda n: n.tag == "yandex-pay-badge" and n.attrs.get("amount")
    )
    if yandex_badge:
        badge_amount = parse_number(yandex_badge.attrs.get("amount"))
        if badge_amount:
            current_price = badge_amount
    badge_amount = None
    badge_node = find_first(
        root_node,
        lambda n: n.tag == "li" and has_class(n, "a-page-detail__badge"),
    )
    if badge_node:
        badge_amount = parse_number(text_content(badge_node))
    if old_price and badge_amount:
        current_price = old_price - badge_amount
    discount_percent = 0
    if old_price and current_price and old_price > 0:
        discount_percent = int(round((old_price - current_price) / old_price * 100))
    return {
        "price": current_price,
        "retail_price": old_price,
        "discount_percent": discount_percent,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Parse Bigam catalog HTML into product JSON."
    )
    source_group = parser.add_mutually_exclusive_group(required=True)
    source_group.add_argument("--input", help="Path to saved HTML file")
    source_group.add_argument("--url", help="Catalog URL to fetch")
    source_group.add_argument("--product-url", help="Product URL to fetch")
    parser.add_argument(
        "--output", default="parsed_products.json", help="Output JSON file path"
    )
    parser.add_argument(
        "--base-url", default="https://www.bigam.ru", help="Base URL for relative links"
    )
    parser.add_argument(
        "--limit", type=int, default=0, help="Limit number of products"
    )
    parser.add_argument(
        "--details",
        action="store_true",
        help="Fetch product pages for breadcrumbs, code, article, ratings",
    )
    parser.add_argument(
        "--specification-only",
        action="store_true",
        help="Always load attributes and complectation from /specification/",
    )
    parser.add_argument(
        "--autotext-only",
        action="store_true",
        help="Output only auto text blocks from a product page",
    )
    args = parser.parse_args()

    output_path = Path(args.output)

    if args.input:
        input_path = Path(args.input)
        html = input_path.read_text(encoding="utf-8", errors="ignore")
    else:
        html = fetch_html(args.url or args.product_url)

    limit = args.limit if args.limit and args.limit > 0 else None
    if args.product_url or args.autotext_only:
        page_url = args.product_url or args.url
        product = parse_product_page(html, args.base_url, page_url=page_url)
        if args.autotext_only:
            payload = {
                "auto_text": product.get("auto_text"),
                "tabs_auto_text": product.get("tabs_auto_text") or [],
                "documents_auto_text": product.get("documents_auto_text"),
            }
            output_path.write_text(
                json.dumps(payload, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
            print(json.dumps(payload, ensure_ascii=False, indent=2))
            return
        output_path.write_text(
            json.dumps(product, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print(f"Saved product to {output_path}")
        return

    page_url = args.url if args.url else None
    products = parse_products(html, args.base_url, limit=limit, page_url=page_url)

    if args.details:
        for product in products:
            href = product.get("href")
            if not href:
                continue
            try:
                detail_html = fetch_html(href)
            except Exception:
                continue
            details = parse_product_page(
                detail_html, args.base_url, page_url=href
            )
            attributes_missing = not details.get("attributes")
            complectation_missing = not details.get("complectation_items")
            if args.specification_only or attributes_missing or complectation_missing:
                if href.endswith("/specification/"):
                    spec_url = href
                elif href.endswith("/"):
                    spec_url = f"{href}specification/"
                else:
                    spec_url = f"{href}/specification/"
                try:
                    spec_html = fetch_html(spec_url)
                except Exception:
                    spec_html = None
                if spec_html:
                    spec_details = parse_product_page(
                        spec_html, args.base_url, page_url=spec_url
                    )
                    spec_attributes = spec_details.get("attributes") or []
                    if spec_attributes:
                        if args.specification_only or attributes_missing or len(spec_attributes) >= len(details.get("attributes") or []):
                            details["attributes"] = spec_attributes
                    if spec_details.get("complectation_items") and (
                        args.specification_only or complectation_missing
                    ):
                        details["complectation_items"] = spec_details.get(
                            "complectation_items"
                        )
            documents_missing = not details.get("documents")
            documents_text_missing = not details.get("documents_auto_text")
            if documents_missing or documents_text_missing:
                if href.endswith("/documents/"):
                    documents_url = href
                elif href.endswith("/"):
                    documents_url = f"{href}documents/"
                else:
                    documents_url = f"{href}/documents/"
                try:
                    documents_html = fetch_html(documents_url)
                except Exception:
                    documents_html = None
                if documents_html:
                    documents_details = parse_product_page(
                        documents_html, args.base_url, page_url=documents_url
                    )
                    if documents_missing and documents_details.get("documents"):
                        details["documents"] = documents_details.get("documents")
                    if documents_text_missing and documents_details.get("documents_auto_text"):
                        details["documents_auto_text"] = documents_details.get(
                            "documents_auto_text"
                        )
            for key in [
                "name",
                "article",
                "code",
                "price",
                "retail_price",
                "discount_percent",
                "description_full",
                "reviews_href",
                "slug",
                "image",
                "images",
                "brand",
                "attributes",
                "complectation_items",
                "documents",
                "documents_auto_text",
                "category",
                "breadcrumbs",
            ]:
                value = details.get(key)
                if key == "images" and not value:
                    continue
                if key == "image" and not value:
                    continue
                if value is not None:
                    product[key] = value

    categories = extract_category_cards(html, args.base_url)
    if not categories:
        categories = extract_category_cards_from_nuxt(html, args.base_url)
    if categories:
        payload = {"products": products, "categories": categories}
    else:
        payload = products

    output_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"Saved {len(products)} products to {output_path}")


if __name__ == "__main__":
    main()
