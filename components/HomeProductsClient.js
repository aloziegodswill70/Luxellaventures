"use client";

import ProductGrid from "@/components/ProductGrid";

export default function HomeProductsClient() {
  return (
    <div id="products" className="px-4 sm:px-6 md:px-8 mt-4">
      <ProductGrid category="all" />
    </div>
  );
}