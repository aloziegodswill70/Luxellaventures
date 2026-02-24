"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/v1771756439/onionchickenflavor_indomie_inu6zn.jpg",
    title: "Onion Chicken Flavour Indomie",
    oldPrice: "£1.20",
    promoPrice: "£0.95",
    promoEnds: "Ends 1 March",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/v1771756439/nigerian_sardine_cwirs1.jpg",
    title: "Nigerian Sardine",
    oldPrice: "£2.50",
    promoPrice: "£1.99",
    promoEnds: "Ends 1 March",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/v1771756439/can_malt_kpgv5h.jpg",
    title: "Can Malt",
    oldPrice: "£0.90",
    promoPrice: "£0.75",
    promoEnds: "Ends 1 March",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/v1771756438/chickenflavor_indomie_ajgcvw.jpg",
    title: "Chicken Flavour Indomie",
    oldPrice: "£1.20",
    promoPrice: "£0.99",
    promoEnds: "Ends 1 March",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/v1771550901/bulkindomie_qqxbrw.png",
    title: "Bulk Indomie",
    oldPrice: "£12.00",
    promoPrice: "£10.50",
    promoEnds: "Ends 1 March",
  },
];

export default function PromoDealsSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full mt-6 px-4 overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-none w-1/2 sm:w-1/3 md:w-1/5 px-2"
          >
            <Link href="/new-products">
              <div className="rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
                <div className="relative h-[150px] sm:h-[180px] md:h-[200px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    priority
                  />
                </div>
                <div className="p-2 text-center flex flex-col gap-1">
                  <h3 className="text-gray-800 text-sm sm:text-base font-semibold">
                    {slide.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm line-through">
                    {slide.oldPrice}
                  </p>
                  <p className="text-orange-500 text-sm sm:text-base font-bold">
                    {slide.promoPrice}{" "}
                    <span className="text-gray-500 text-xs">
                      {slide.promoEnds}
                    </span>
                  </p>
                  <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition">
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