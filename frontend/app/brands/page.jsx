import { Suspense } from "react";
import BrandsPageClient from "./BrandsPageClient";

export default function BrandsPage() {
  return (
    <Suspense fallback={null}>
      <BrandsPageClient />
    </Suspense>
  );
}
