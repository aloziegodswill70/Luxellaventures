"use client";

import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { slugify } from "@/utils/categorySlug";

export default function ProductGrid({
  category = "all",
  search = "",
  sort = "",
}) {
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (category !== "all") {
      list = list.filter(
        (p) => slugify(p.category) === category
      );
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q)
      );
    }

    // Sort
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
    </section>
  );
}
