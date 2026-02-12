// components/home/PopularThisWeekSection.js
"use client";

import { useMemo } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function PopularThisWeekSection({
  // ✅ Put the IDs you want to feature (recommended)
  popularIds = [
    "whole-egusi-1kg",
    "fresh-ugu",
    "hake-fish",
    "red-cap-pepper",
    "uncut-ugba",
    "ijebu-garri",
  ],
  title = "Popular this week",
  subtitle = "UK customers are buying these a lot 🔥",
  limit = 10,
}) {
  const { addToCart, setIsCartOpen } = useCart();

  const popularProducts = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p]));
    const picked = popularIds.map((id) => map.get(id)).filter(Boolean);

    // Fallback if some IDs don't exist
    if (picked.length < Math.min(limit, 6)) {
      const used = new Set(picked.map((p) => p.id));
      const extra = products.filter((p) => !used.has(p.id)).slice(0, limit - picked.length);
      return [...picked, ...extra].slice(0, limit);
    }

    return picked.slice(0, limit);
  }, [popularIds, limit]);

  const handleAdd = (p) => {
    addToCart(p);
    setIsCartOpen(true);
  };

  return (
    <section className="px-4 py-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-50 border">
            Fast delivery • Same day
          </span>
        </div>
      </div>

      {/* Scroll strip */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 min-w-max pb-1">
          {popularProducts.map((p) => (
            <div
              key={p.id}
              className="w-[180px] sm:w-[210px] bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow transition flex-shrink-0"
            >
              <div className="relative h-[120px] bg-gray-50">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="210px"
                />

                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-700 text-white">
                    POPULAR
                  </span>
                </div>
              </div>

              <div className="p-3">
                <p className="text-sm font-semibold leading-snug line-clamp-2">
                  {p.name}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-sm font-bold text-green-700">
                      £{Number(p.price || 0).toFixed(2)}
                    </p>
                    <p className="text-[11px] text-gray-500">{p.unit || ""}</p>
                  </div>

                  <button
                    onClick={() => handleAdd(p)}
                    className="px-3 py-2 rounded-xl bg-black hover:bg-gray-900 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                <p className="mt-2 text-[11px] text-gray-500 truncate">
                  {p.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tiny helper text */}
      <p className="text-[11px] text-gray-500 mt-3">
        Tip: Tap “Add” to quickly build your cart, then checkout with Stripe.
      </p>
    </section>
  );
}
