"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { newProducts } from "@/data/new-products";

export default function NewArrivalSlider() {
  const [current, setCurrent] = useState(0);

  const itemsToShow = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev + itemsToShow >= newProducts.length
          ? 0
          : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const visibleProducts = newProducts.slice(
    current,
    current + itemsToShow
  );

  return (
    <section className="relative w-full py-14 px-4 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            ✨ New Arrivals
          </h2>

          <Link
            href="/new-products"
            className="text-sm font-semibold text-green-600 hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 transition-all duration-700">

          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-200/20 to-orange-200/20 opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Image */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-center line-clamp-2">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500 text-center mt-1">
                Freshly stocked • Premium quality
              </p>

              {/* Button */}
              <Link
                href="/new-products"
                className="mt-4 text-xs bg-black text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
              >
                Shop Now
              </Link>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}