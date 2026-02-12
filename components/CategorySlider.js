// components/CategorySlider.js
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { products } from "@/data/products";

/**
 * Each product has:
 * { category: "Vegetables", image: "https://..." }
 */

export default function CategorySlider({ active, onSelect }) {
  const sliderRef = useRef(null);

  const { categories, categoryMap, allImages } = useMemo(() => {
    // ✅ Build category → first image map (no duplicates)
    const map = {};
    for (const p of products) {
      if (!p?.category || !p?.image) continue;
      if (!map[p.category]) map[p.category] = p.image;
    }

    // ✅ Build "All" collage images from current products (unique)
    const seen = new Set();
    const collage = [];
    for (const p of products) {
      if (!p?.image) continue;
      if (seen.has(p.image)) continue;
      seen.add(p.image);
      collage.push(p.image);
      if (collage.length === 3) break;
    }

    return {
      categoryMap: map,
      categories: ["all", ...Object.keys(map)],
      allImages: collage,
    };
  }, []);

  // ✅ Auto-scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollBy({ left: 220, behavior: "smooth" });

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-semibold mb-4">Shop by Category</h2>

      <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => {
          const isActive = active === cat;

          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`
                relative min-w-[180px] h-[120px] rounded-xl overflow-hidden
                transition-all active:scale-95
                ${isActive ? "ring-2 ring-orange-500" : "ring-1 ring-gray-200"}
              `}
            >
              {/* IMAGE */}
              {cat === "all" ? (
                // ✅ "All" collage (3 product images) - no logo
                <div className="absolute inset-0 grid grid-cols-3">
                  {(allImages.length ? allImages : Object.values(categoryMap).slice(0, 3)).map(
                    (src, idx) => (
                      <div key={`${src}-${idx}`} className="relative h-[120px]">
                        <Image
                          src={src}
                          alt="All products"
                          fill
                          className="object-cover"
                          sizes="180px"
                          priority={isActive}
                        />
                      </div>
                    )
                  )}
                </div>
              ) : (
                <Image
                  src={categoryMap[cat]}
                  alt={cat}
                  fill
                  className="object-cover"
                  sizes="180px"
                  priority={isActive}
                />
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <span
                  className={`
                    w-full text-center text-white text-sm font-semibold
                    py-2 backdrop-blur-sm
                    ${isActive ? "bg-orange-500/80" : "bg-black/40"}
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
