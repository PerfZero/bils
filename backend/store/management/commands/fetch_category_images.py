import mimetypes
import re
import urllib.parse
import urllib.request

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from store.models import Category


def fetch_html(url):
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; MMSFetcher/1.0)",
            "Accept": "text/html,application/xhtml+xml",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def extract_meta_image(html):
    patterns = [
        r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+name=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+property=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']',
    ]
    for pattern in patterns:
        match = re.search(pattern, html, re.I)
        if match:
            return match.group(1)
    return None


def normalize_url(url, base_url):
    if not url:
        return None
    if url.startswith("//"):
        return f"https:{url}"
    if url.startswith("/"):
        return f"{base_url.rstrip('/')}{url}"
    return url


def guess_extension(url, content_type):
    if url:
        suffix = urllib.parse.urlparse(url).path
        suffix = suffix.rsplit(".", 1)
        if len(suffix) == 2 and suffix[1]:
            return f".{suffix[1].split('?')[0]}"
    if content_type:
        ext = mimetypes.guess_extension(content_type.split(";")[0].strip())
        if ext:
            return ext
    return ".jpg"


def download_image(url):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; MMSFetcher/1.0)"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        content_type = response.headers.get("Content-Type", "")
        content = response.read()
    return content, content_type


class Command(BaseCommand):
    help = "Fetch missing category images from Bigam catalog pages."

    def add_arguments(self, parser):
        parser.add_argument(
            "--base-url",
            default="https://www.bigam.ru",
            help="Base URL for category pages",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=0,
            help="Limit number of categories to process",
        )
        parser.add_argument(
            "--force",
            action="store_true",
            help="Overwrite existing category images",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Only print what would be downloaded",
        )

    def handle(self, *args, **options):
        base_url = options["base_url"]
        limit = options["limit"]
        force = options["force"]
        dry_run = options["dry_run"]

        qs = Category.objects.all().order_by("id")
        if not force:
            qs = qs.filter(image="")
        if limit and limit > 0:
            qs = qs[:limit]

        total = 0
        updated = 0
        errors = 0

        for category in qs:
            total += 1
            page_url = f"{base_url.rstrip('/')}/catalog/{category.slug}/"
            try:
                html = fetch_html(page_url)
                image_url = normalize_url(extract_meta_image(html), base_url)
                if not image_url:
                    self.stdout.write(
                        f"[skip] {category.slug}: no og:image found"
                    )
                    continue
                if dry_run:
                    self.stdout.write(
                        f"[dry-run] {category.slug} -> {image_url}"
                    )
                    updated += 1
                    continue
                content, content_type = download_image(image_url)
                ext = guess_extension(image_url, content_type)
                filename = f"category-{category.slug}{ext}"
                category.image.save(filename, ContentFile(content), save=True)
                updated += 1
                self.stdout.write(f"[ok] {category.slug} -> {filename}")
            except Exception as exc:
                errors += 1
                self.stdout.write(f"[error] {category.slug}: {exc}")

        self.stdout.write(
            f"Done. processed={total} updated={updated} errors={errors}"
        )
