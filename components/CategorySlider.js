"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { products } from "@/data/products";

export default function CategorySlider({ active, onSelect }) {
  const sliderRef = useRef(null);

  // ✅ Extract unique categories from products
  const categories = [
    "all",
    ...Array.from(new Set(products.map(p => p.category))),
  ];

  // ✅ Auto scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollBy({
        left: 200,
        behavior: "smooth",
      });

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth
      ) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-3">
        Shop by Category
      </h2>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
      >
        {categories.map((cat) => {
          const isActive = active === cat;

          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`
                min-w-[140px] h-[100px]
                rounded-xl border flex items-center justify-center
                font-medium capitalize
                ${
                  isActive
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                }
              `}
            >
              {cat === "all" ? "All Products" : cat}
            </button>
          );
        })}
      </div>
    </section>
  );
}