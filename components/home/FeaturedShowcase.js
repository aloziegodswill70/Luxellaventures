// components/home/FeaturedShowcase.js
"use client";

import Image from "next/image";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

function pickFeaturedProducts(list) {
  // Pick first 4 with images (fallback to first 4)
  const withImages = list.filter((p) => p?.image || p?.images?.[0]);
  const chosen = (withImages.length ? withImages : list).slice(0, 4);
  return chosen;
}

export default function FeaturedShowcase() {
  const { addToCart, setIsCartOpen } = useCart();

  const featured = pickFeaturedProducts(products);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">Featured Today</h2>
          <p className="text-sm text-gray-600">
            Popular African food items customers love.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {featured.map((p) => {
          const src = p.image || p.images?.[0] || null;

          return (
            <div
              key={p.id}
              className="rounded-2xl border bg-white overflow-hidden shadow-sm"
            >
              <div className="relative h-36 sm:h-44 bg-gray-50">
                {src ? (
                  <Image
                    src={src}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    No image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white font-semibold text-sm line-clamp-2">
                    {p.name}
                  </p>
                  <p className="text-white/90 text-xs">{p.unit || ""}</p>
                </div>
              </div>

              <div className="p-3 flex items-center justify-between gap-2">
                <span className="font-bold text-green-700 text-sm">
                  £{Number(p.price || 0).toFixed(2)}
                </span>

                <button
                  onClick={() => {
                    addToCart(p);
                    setIsCartOpen(true);
                  }}
                  className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
