"use client";

import CatalogSlugPage from "./[slug]/page";

export default function CatalogPage() {
  return <CatalogSlugPage params={{ slug: "all" }} />;
}
