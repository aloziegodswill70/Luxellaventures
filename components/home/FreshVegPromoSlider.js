"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/v1771550896/freshuziza_jubqvd.png",
    title: "Fresh Uziza Leaves",
    promo: "20% OFF Today",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/v1771550900/freshoha_wjqp7o.png",
    title: "Fresh Oha Leaves",
    promo: "20% OFF Today",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/v1771550899/freshbitterleaf_dgyf0e.png",
    title: "Fresh Bitterleaf",
    promo: "20% OFF Today",
  },

  // ✅ NEW PRODUCTS ADDED BELOW (Replace image links)

  {
    id: 4,
    image: "https://res.cloudinary.com/dut0fvswc/image/upload/v1771756441/turkey_wings_j57ljk.png",
    title: "Turkey Wings",
    promo: "20% OFF Today",
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dut0fvswc/image/upload/v1771756441/special_goatmeat_tfnwjn.png",
    title: "Special Goat Meat",
    promo: "20% OFF Today",
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/dut0fvswc/image/upload/v1771756438/jumbo_snail_awqgqv.jpg",
    title: "Jumbo Snail",
    promo: "20% OFF Today",
  },
  {
    id: 7,
    image: "https://res.cloudinary.com/dut0fvswc/image/upload/v1771756437/fresh_fufu_ozxmie.jpg",
    title: "Fresh Fufu",
    promo: "20% OFF Today",
  },
];

export default function FreshVegPromoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full mt-24 sm:mt-28 md:mt-32 px-4 overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full sm:min-w-[50%] md:min-w-[33.333%] px-2"
          >
            <Link href="/new-products">
              <div className="relative h-[260px] sm:h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                  <h2 className="text-white text-lg sm:text-2xl font-bold">
                    {slide.title}
                  </h2>

                  <p className="text-orange-400 text-sm sm:text-base mt-2 font-semibold">
                    {slide.promo}
                  </p>

                  <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm transition">
                    Shop Now
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}