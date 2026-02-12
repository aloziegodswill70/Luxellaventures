// components/home/HomeHero.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

function pickImage(fallbackIndex = 0) {
  const p = products?.[fallbackIndex];
  return p?.image || p?.images?.[0] || null;
}

export default function HomeHero({ onShopNow }) {
  const heroImg = pickImage(0);

  return (
    <section className="relative mt-14">
      {/* Background */}
      <div className="absolute inset-0">
        {heroImg ? (
          <Image
            src={heroImg}
            alt="African food items in the UK"
            fill
            className="object-cover opacity-25"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col gap-4">
          <p className="text-orange-600 font-semibold">
            Best African Food Items in the UK
          </p>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            Shop your favorites — fresh, frozen & spices delivered fast.
          </h1>

          <p className="text-gray-600 max-w-2xl">
            Fast delivery of food items to your doorstep within{" "}
            <span className="font-semibold">5 hours</span> (where available).
            Secure checkout with Stripe, plus WhatsApp fallback.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => {
                onShopNow?.();
                const el = document.getElementById("products");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Shop Now
            </button>

            <Link
              href="/checkout"
              className="border border-gray-300 hover:border-gray-400 px-5 py-3 rounded-xl font-semibold text-gray-800"
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
