import type { Metadata } from "next";
import CatalogSlugPage from "./page.client";

const API_BASE_URL =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

function toPlainText(value?: string) {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchCategory(slug: string) {
  if (!slug) return null;
  const res = await fetch(
    `${API_BASE_URL}/api/categories/path-by-slug/?slug=${encodeURIComponent(slug)}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  const payload = await res.json();
  const path = Array.isArray(payload) ? payload : [];
  return path.length ? path[path.length - 1] : null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string };
}): Promise<Metadata> {
  const slug = params?.slug || "";
  const isAllCatalog = !slug || slug === "all";
  if (isAllCatalog) {
    return {
      title: "Каталог товаров — Bremax",
      description:
        "Инструменты, оборудование и расходные материалы для дома, сада, строительства и сервиса. Быстрая доставка и удобный подбор.",
    };
  }

  const category = await fetchCategory(slug);
  const name = category?.name || slug;
  const descriptionRaw =
    toPlainText(category?.description) ||
    `Купить ${name} в Bremax — цены, характеристики, отзывы и доставка.`;

  return {
    title: `${name} — купить в Bremax`,
    description: descriptionRaw,
  };
}

export default function CatalogPage({ params }: { params: { slug?: string } }) {
  return <CatalogSlugPage params={params} />;
}
