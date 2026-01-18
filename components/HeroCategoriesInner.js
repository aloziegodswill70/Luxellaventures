"use client";

import Image from "next/image";
import { slugify } from "@/utils/categorySlug";

const categories = [
  { name: "All", img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260300/yam1_wlyvtp.jpg" },
  { name: "Frozen", img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260267/large_croaker_fish_frozen_rubf44.webp" },
  { name: "Peppers", img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260286/ugandan_chili_pepper_iukc3w.avif" },
  { name: "Tubers", img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260300/yam_tubers_african_market1_v0ymys.webp" },
  { name: "Grains", img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260265/dry-beans_mp8kma.jpg" },
];

export default function HeroCategoriesInner({
  activeCategory,
  onSelectCategory,
}) {
  return (
    <section className="py-4 sticky top-0 bg-white z-40">
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide">
        {categories.map((cat) => {
          const slug = slugify(cat.name);
          const isActive = activeCategory === slug;

          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(slug)}
              className={`min-w-[45%] sm:min-w-[30%] rounded-xl border transition
                ${isActive ? "border-green-600 ring-2 ring-green-200" : "border-gray-200"}
              `}
            >
              <div className="relative h-24">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <p className="text-center text-sm font-medium py-2">
                {cat.name}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
