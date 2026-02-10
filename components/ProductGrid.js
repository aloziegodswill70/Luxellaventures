"use client";

import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const SPICE_KEYWORDS = [
  "spice",
  "thyme",
  "prekese",
  "achi",
  "uziza",
  "ogiri",
  "egusi",
  "prawns",
  "dawadawa",
  "iru",
  "ginger",
  "garlic",
  "pepper soup",
];

export default function ProductGrid({ category, search, sort }) {
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // ✅ Category filter
    if (category && category !== "all") {
      if (category === "Spices") {
        list = list.filter((p) => {
          const text = `${p.id || ""} ${p.name || ""}`.toLowerCase();
          return SPICE_KEYWORDS.some((k) => text.includes(k));
        });
      } else {
        list = list.filter((p) => p.category === category);
      }
    }

    // ✅ Search filter
    if (search?.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => {
        const text = `${p.name || ""} ${p.category || ""}`.toLowerCase();
        return text.includes(q);
      });
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
    <section className="px-3 py-4" id="products">
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No products found.</p>
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
