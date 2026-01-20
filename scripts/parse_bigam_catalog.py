#!/usr/bin/env python3
import argparse
import json
import re
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path


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
        rating_node = find_first(
            node, lambda n: n.tag == "div" and has_class(n, "a-rating__count")
        )
        rating = parse_number(text_content(rating_node)) if rating_node else 0

        images = extract_images(node, base_url, name, product_id)
        image = images[0]["url"] if images else None

        attributes = extract_attributes(node, product_id)
        price_data = extract_price_block(node)

        products.append(
            {
                "id": product_id,
                "code": code,
                "name": name,
                "href": href,
                "reviews_href": reviews_href,
                "rating": rating,
                "price": price_data.get("price"),
                "retail_price": price_data.get("retail_price"),
                "discount_percent": price_data.get("discount_percent"),
                "min_bonus_price": price_data.get("min_bonus_price"),
                "show_personal_price_difference": price_data.get(
                    "show_personal_price_difference"
                ),
                "image": image,
                "images": images,
                "attributes": attributes,
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


def parse_product_page(html, base_url, page_url=None):
    parser = TreeBuilder()
    parser.feed(html)

    name_node = find_first(
        parser.root,
        lambda n: n.tag == "h1" and has_class(n, "a-page-detail__title"),
    )
    name = text_content(name_node) if name_node else None

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

    rating_node = find_first(
        parser.root, lambda n: n.tag == "div" and has_class(n, "a-rating__count")
    )
    rating = parse_number(text_content(rating_node)) if rating_node else 0

    rating_count_node = find_first(
        parser.root, lambda n: n.tag == "div" and has_class(n, "a-comment__count")
    )
    rating_count = parse_number(text_content(rating_count_node)) if rating_count_node else 0

    price_data = extract_detail_price(parser.root)

    brand = None
    attributes = []
    features_section = find_first(
        parser.root, lambda n: n.tag == "section" and has_class(n, "a-page-detail__features")
    )
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

    breadcrumbs = extract_breadcrumb_jsonld(html, base_url)
    if not breadcrumbs:
        breadcrumbs = extract_breadcrumb_dom(html, base_url)
    category = derive_category_from_breadcrumbs(breadcrumbs, base_url)

    slug = slug_from_href(page_url, base_url, allow_product=True) if page_url else None

    return {
        "name": name,
        "article": article,
        "code": code,
        "rating": rating,
        "rating_count": rating_count,
        "price": price_data.get("price"),
        "retail_price": price_data.get("retail_price"),
        "discount_percent": price_data.get("discount_percent"),
        "href": page_url,
        "reviews_href": reviews_href,
        "slug": slug,
        "brand": brand,
        "attributes": attributes,
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
    return {
        "name": last.get("name"),
        "href": href,
        "slug": slug,
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
    args = parser.parse_args()

    output_path = Path(args.output)

    if args.input:
        input_path = Path(args.input)
        html = input_path.read_text(encoding="utf-8", errors="ignore")
    else:
        html = fetch_html(args.url or args.product_url)

    limit = args.limit if args.limit and args.limit > 0 else None
    if args.product_url:
        product = parse_product_page(html, args.base_url, page_url=args.product_url)
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
            for key in [
                "name",
                "article",
                "code",
                "rating",
                "rating_count",
                "price",
                "retail_price",
                "discount_percent",
                "reviews_href",
                "slug",
                "brand",
                "attributes",
                "category",
                "breadcrumbs",
            ]:
                value = details.get(key)
                if value is not None:
                    product[key] = value

    output_path.write_text(
        json.dumps(products, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"Saved {len(products)} products to {output_path}")


if __name__ == "__main__":
    main()
