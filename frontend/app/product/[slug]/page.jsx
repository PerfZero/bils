import ProductPage from "./page.client";

const API_BASE_URL =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

function toPlainText(value) {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchProduct(slug) {
  if (!slug) return null;
  const url = `${API_BASE_URL}/api/products/?slug=${encodeURIComponent(slug)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  const payload = await res.json();
  const results = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
      ? payload.results
      : [];
  return results.length ? results[0] : null;
}

export async function generateMetadata({ params }) {
  const slug = params?.slug || "";
  const product = await fetchProduct(slug);
  const name = product?.name || slug;
  const rawDescription =
    toPlainText(product?.description_full) ||
    toPlainText(product?.description) ||
    toPlainText(product?.auto_text) ||
    `Купить ${name} в Bremax. Характеристики, цены и доставка.`;

  return {
    title: `${name} — купить в Bremax`,
    description: rawDescription,
  };
}

export default function ProductPageWrapper({ params }) {
  return <ProductPage params={params} />;
}
