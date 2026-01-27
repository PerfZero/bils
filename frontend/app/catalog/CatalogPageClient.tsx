"use client";

import CatalogSlugPage from "./[slug]/page.client";

export default function CatalogPageClient() {
  return <CatalogSlugPage params={{ slug: "all" }} />;
}
