"use client";

import Image from "next/image";
import { useMemo, useEffect, useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function RecommendedForYouSection({
  activeCategory = "all",
  limit = 8,
}) {
  const { cartItems, addToCart, setIsCartOpen } = useCart();

  // ✅ deterministic list for SSR/CSR match
  const baseRecommended = useMemo(() => {
    const all = [...products];

    const cartCategories = new Set(cartItems.map((c) => c.category));
    const cartIds = new Set(cartItems.map((c) => c.id));

    // 1) Prefer same-category items (not in cart)
    let list = all.filter(
      (p) => cartCategories.has(p.category) && !cartIds.has(p.id)
    );

    // 2) If still small, use current selected category
    if (list.length < limit && activeCategory !== "all") {
      const more = all.filter(
        (p) => p.category === activeCategory && !cartIds.has(p.id)
      );
      list = mergeUnique(list, more);
    }

    // 3) Fallback: any products not in cart
    if (list.length < limit) {
      const more = all.filter((p) => !cartIds.has(p.id));
      list = mergeUnique(list, more);
    }

    // ✅ NO Math.random here
    return list.slice(0, limit);
  }, [cartItems, activeCategory, limit]);

  // ✅ optional: shuffle AFTER mount (client only) to keep UI fresh
  const [recommended, setRecommended] = useState(baseRecommended);

  useEffect(() => {
    // update when base changes
    setRecommended(baseRecommended);

    // optional shuffle AFTER hydration (safe)
    setRecommended((prev) => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  }, [baseRecommended]);

  const handleAdd = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  if (!recommended.length) return null;

  return (
    <section className="px-4 mt-6">
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg font-bold">Recommended for you</h2>
          <p className="text-sm text-gray-600">Based on your cart & browsing</p>
        </div>
        <span className="text-xs text-gray-500">Tap to add</span>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {recommended.map((p) => (
          <div
            key={p.id}
            className="min-w-[160px] max-w-[160px] bg-white border rounded-xl overflow-hidden shadow-sm"
          >
            <div className="relative w-full h-28 bg-gray-50">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>

            <div className="p-3">
              <p className="text-sm font-semibold leading-snug line-clamp-2">
                {p.name}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-green-700">
                  £{Number(p.price || 0).toFixed(2)}
                </span>
                <span className="text-[10px] text-gray-500 truncate max-w-[70px]">
                  {p.category}
                </span>
              </div>

              <button
                onClick={() => handleAdd(p)}
                className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 rounded-lg font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function mergeUnique(a, b) {
  const map = new Map();
  [...a, ...b].forEach((item) => map.set(item.id, item));
  return Array.from(map.values());
}
