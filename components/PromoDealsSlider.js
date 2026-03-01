"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <section className="w-full mt-6 px-4">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          🔥 Promo Deals
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {slides.map((slide) => (
            <Link key={slide.id} href="/new-products">
              <div className="rounded-lg overflow-hidden shadow-md bg-white flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                
                <div className="relative h-[150px] sm:h-[180px] md:h-[200px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                </div>

                <div className="p-3 text-center flex flex-col gap-1">
                  <h3 className="text-gray-800 text-sm sm:text-base font-semibold">
                    {slide.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm line-through">
                    {slide.oldPrice}
                  </p>

                  <p className="text-orange-600 text-sm sm:text-base font-bold">
                    {slide.promoPrice}
                  </p>

                  <span className="text-gray-500 text-xs">
                    {slide.promoEnds}
                  </span>

                  <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition">
                    Shop Now
                  </button>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}