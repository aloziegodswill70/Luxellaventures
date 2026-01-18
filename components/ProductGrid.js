"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { slugify } from "@/utils/categorySlug";

export default function ProductGrid() {
  const params = useSearchParams();

  const category = params.get("category") || "all";
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // ✅ Category filter
    if (category !== "all") {
      list = list.filter(
        (p) => slugify(p.category) === category
      );
    }

    // ✅ Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q)
      );
    }

    // ✅ Sorting
    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [category, search, sort]);

  return (
    <section className="px-3 py-4">
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No products found.
        </p>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            gap-3
            animate-fadeIn
          "
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
