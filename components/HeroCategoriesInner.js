"use client";

import Image from "next/image";
import { products } from "@/data/products";

/**
 * Category → Image mapping
 * (Only images are defined manually)
 */
const categoryImages = {
  Vegetables:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346949/tomato_ibeo8v.png",
  Pepper:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346950/ugandapepper_jlfqqt.jpg",
  Fish:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346965/wholetilapia_qkt6vg.png",
  "Frozen Protein":
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346901/frozenfish_b02yqa.png",
  Protein:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346898/beef_w5m7xr.png",
  Chicken:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346928/pluverahardchicken_tsxa5k.png",
  Garri:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346917/ijebugarri_qp2i6a.png",
  Grains:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346899/beans_cbdkke.png",
  Yam:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346901/freshuncutyam_sf0rba.png",
  Plantain:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346956/unripeplantain_bowe4c.jpg",
  Oil:
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1769346957/vegetableoil_avpink.png",
};

/**
 * Build categories dynamically from products
 */
const categories = [
  {
    name: "All",
    value: "all",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260300/yam1_wlyvtp.jpg",
  },
  ...Array.from(new Set(products.map((p) => p.category))).map((cat) => ({
    name: cat,
    value: cat,
    img: categoryImages[cat] || categoryImages["Vegetables"],
  })),
];

export default function CategoriesInner({ active, onSelect }) {
  return (
    <section className="sticky top-14 bg-white z-40 border-b">
      <div className="flex gap-3 overflow-x-auto px-4 py-4 scrollbar-hide">
        {categories.map((cat) => {
          const isActive =
            active === cat.value ||
            (active === "all" && cat.value === "all");

          return (
            <button
              key={cat.value}
              onClick={() => onSelect(cat.value)}
              className={`
                min-w-[45%] sm:min-w-[30%]
                rounded-xl border transition
                ${
                  isActive
                    ? "border-orange-400 ring-2 ring-orange-200"
                    : "border-gray-200 hover:border-orange-300"
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