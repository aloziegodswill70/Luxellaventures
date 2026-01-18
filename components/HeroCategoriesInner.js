"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { slugify } from "@/utils/categorySlug";

const categories = [
  {
    name: "All",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260300/yam1_wlyvtp.jpg",
  },
  {
    name: "Frozen",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260267/large_croaker_fish_frozen_rubf44.webp",
  },
  {
    name: "Peppers",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260286/ugandan_chili_pepper_iukc3w.avif",
  },
  {
    name: "Tubers",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260300/yam_tubers_african_market1_v0ymys.webp",
  },
  {
    name: "Grains",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260265/dry-beans_mp8kma.jpg",
  },
];

export default function HeroCategoriesInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";

  const handleClick = (slug) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="sticky top-14 bg-white z-40 border-b">
      <div className="flex gap-3 overflow-x-auto px-4 py-4 scrollbar-hide">
        {categories.map((cat) => {
          const slug = slugify(cat.name);
          const isActive = activeCategory === slug;

          return (
            <button
              key={cat.name}
              onClick={() => handleClick(slug)}
              className={`
                min-w-[45%] sm:min-w-[30%]
                rounded-xl border transition
                ${
                  isActive
                    ? "border-orange-400 ring-2 ring-orange-200"
                    : "border-gray-200"
                }
              `}
            >
              <div className="relative h-24">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover rounded-t-xl"
                  priority={isActive}
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
