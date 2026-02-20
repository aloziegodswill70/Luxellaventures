"use client";

import Image from "next/image";
import { useRef } from "react";

const slides = [
  {
    id: 1,
    image: "/images/freshuziza.png",
    title: "Fresh Uziza Leaves",
    promo: "20% OFF Today",
  },
  {
    id: 2,
    image: "/images/freshoha.png",
    title: "Fresh Oha Leaves",
    promo: "20% OFF Today",
  },
  {
    id: 3,
    image: "/images/freshbitterleaf.png",
    title: "Fresh Bitterleaf",
    promo: "20% OFF Today",
  },
];

export default function FreshVegPromoSlider() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.offsetWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width / 2 : width / 2,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 mt-4">
      <h2 className="text-lg font-bold mb-2 px-1">Latest Fresh Vegetables</h2>

      <div className="relative">
        {/* Slider container */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2 scroll-smooth"
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-none w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-3">
                <h3 className="text-white text-sm sm:text-base font-semibold truncate">
                  {slide.title}
                </h3>
                <p className="text-white text-xs sm:text-sm">{slide.promo}</p>
              </div>

              {/* Shop Now button */}
              <button
                onClick={() =>
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm px-3 py-1 rounded-md transition"
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 left-0 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-md z-10 md:hidden"
        >
          ◀
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 right-0 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-md z-10 md:hidden"
        >
          ▶
        </button>
      </div>
    </section>
  );
}