// components/home/HotDealsSection.js
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function HotDealsSection({
  // ✅ Put the product IDs you want as “Hot Deals” here
  dealIds = [
    "whole-egusi-1kg",
    "fresh-okro-box",
    "hake-fish",
    "pluvera-hard-chicken",
  ],

  // ✅ Countdown (default: 5 hours from page load)
  hours = 5,
}) {
  const { addToCart, setIsCartOpen } = useCart();

  const deals = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p]));
    const chosen = dealIds.map((id) => map.get(id)).filter(Boolean);

    // fallback: if any ID is missing, fill from first products
    if (chosen.length < 4) {
      const used = new Set(chosen.map((p) => p.id));
      const extra = products.filter((p) => !used.has(p.id)).slice(0, 4 - chosen.length);
      return [...chosen, ...extra];
    }

    return chosen.slice(0, 4);
  }, [dealIds]);

  // ✅ End time fixed after first render
  const [endAt] = useState(() => Date.now() + hours * 60 * 60 * 1000);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = Math.max(0, endAt - now);
  const timeLabel = formatTime(remaining);

  const handleAdd = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <section className="px-4 pt-6 pb-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-orange-600">HOT DEALS 🔥</p>
          <h2 className="text-lg font-bold">Today’s Hot Deals</h2>
          <p className="text-sm text-gray-600">
            Limited-time offers • Ends in{" "}
            <span className="font-semibold text-gray-900">{timeLabel}</span>
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold border border-orange-100">
            Best African food items in UK 🇬🇧
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {deals.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow transition"
          >
            <div className="relative aspect-[4/3] bg-gray-50">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={false}
              />

              {/* Badge */}
              <div className="absolute top-2 left-2">
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-black/80 text-white">
                  DEAL
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
                  className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Small note */}
      <p className="text-[11px] text-gray-500 mt-3">
        Tip: Add items now — checkout takes less than 1 minute.
      </p>
    </section>
  );
}
