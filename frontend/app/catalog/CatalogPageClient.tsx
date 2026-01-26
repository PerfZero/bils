"use client";

import CatalogSlugPage from "./[slug]/page";

export default function CatalogPageClient() {
  return <CatalogSlugPage params={{ slug: "all" }} />;
}
