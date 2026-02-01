"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { products } from "@/data/products";

/**
 * Assumption:
 * Each product has:
 * {
 *   category: "fruits",
 *   image: "/images/apple.jpg"
 * }
 */

export default function CategorySlider({ active, onSelect }) {
  const sliderRef = useRef(null);

  // ✅ Build category → image map
  const categoryMap = {};

  products.forEach((product) => {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = product.image;
    }
  });

  const categories = ["all", ...Object.keys(categoryMap)];

  // ✅ Auto-scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollBy({ left: 220, behavior: "smooth" });

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - 10
      ) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-semibold mb-4">
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
                relative min-w-[180px] h-[120px] rounded-xl overflow-hidden
                transition-all active:scale-95
                ${
                  isActive
                    ? "ring-2 ring-orange-500"
                    : "ring-1 ring-gray-200"
                }
              `}
            >
              {/* IMAGE */}
              <Image
                src={
                  cat === "all"
                    ? "/images/all-products.jpg" // 👈 add a nice generic image
                    : categoryMap[cat]
                }
                alt={cat}
                fill
                className="object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <span
                  className={`
                    w-full text-center text-white text-sm font-semibold
                    py-2 backdrop-blur-sm
                    ${
                      isActive
                        ? "bg-orange-500/80"
                        : "bg-black/40"
                    }
                  `}
                >
                  {cat === "all" ? "All Products" : cat}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
