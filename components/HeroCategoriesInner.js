"use client";

import Image from "next/image";
import { products } from "@/data/products";

/**
 * Helper: find product image by keyword in id or name
 */
function findImageByKeyword(keyword) {
  const k = keyword.toLowerCase();
  const p = products.find(
    (x) =>
      (x.id || "").toLowerCase().includes(k) ||
      (x.name || "").toLowerCase().includes(k)
  );
  return p?.image;
}

/**
 * Category → Image mapping
 * (We can pull some images from products so you don’t manually manage everything)
 */
const categoryImages = {
  Vegetables:
    findImageByKeyword("ugu") ||
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1770668610/fresh_ugu_g25jkj.webp",

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

  // ✅ New: Spices
  // (use one of the new spice images you added)
  Spices:
    findImageByKeyword("pepper_soup_spice") ||
    findImageByKeyword("thyme") ||
    "https://res.cloudinary.com/dut0fvswc/image/upload/v1770668621/pepper_soup_spice_nqjhly.webp",
};

/**
 * Detect spices from the products you added
 * (adjust keywords anytime)
 */
const SPICE_KEYWORDS = [
  "spice",
  "thyme",
  "prekese",
  "achi",
  "uziza",
  "ogiri",
  "egusi",
  "prawns",
  "dawadawa",
  "iru",
  "ginger",
  "garlic",
];

/**
 * Build dynamic categories from products
 */
const dynamicCategories = Array.from(new Set(products.map((p) => p.category)));

/**
 * ✅ Add virtual categories (like Spices) if matching products exist
 */
const hasSpices = products.some((p) => {
  const text = `${p.id || ""} ${p.name || ""}`.toLowerCase();
  return SPICE_KEYWORDS.some((k) => text.includes(k));
});

/**
 * Final categories used by the UI
 * IMPORTANT: value is what your filter will receive.
 */
const categories = [
  { name: "All", value: "all" },

  // virtual category
  ...(hasSpices ? [{ name: "Spices", value: "Spices" }] : []),

  // real categories coming from your product.category values
  ...dynamicCategories.map((cat) => ({
    name: cat,
    value: cat,
  })),
];

export default function CategoriesInner({ active, onSelect }) {
  /**
   * When user clicks "Spices", we’ll send "Spices" to the parent.
   * ✅ NOTE: ProductGrid must know how to filter "Spices" (we’ll update that next).
   */

  // 2–3 product images collage for "All"
  const allImages = [
    categoryImages.Vegetables,
    categoryImages.Pepper,
    categoryImages.Fish,
  ].filter(Boolean);

  return (
    <section className="sticky top-14 bg-white z-40 border-b">
      <div className="flex gap-3 overflow-x-auto px-4 py-4 scrollbar-hide">
        {categories.map((cat) => {
          const isActive =
            active === cat.value ||
            (active === "all" && cat.value === "all");

          const img =
            cat.value === "all"
              ? null
              : categoryImages[cat.value] || categoryImages.Vegetables;

          return (
            <button
              key={cat.value}
              onClick={() => onSelect(cat.value)}
              className={`
                min-w-[45%] sm:min-w-[30%]
                rounded-xl border transition overflow-hidden
                ${
                  isActive
                    ? "border-orange-400 ring-2 ring-orange-200"
                    : "border-gray-200 hover:border-orange-300"
                }
              `}
            >
              {/* IMAGE AREA */}
              <div className="relative h-24 bg-gray-100">
                {cat.value === "all" ? (
                  // ✅ "All" collage (works better than logo on mobile)
                  <div className="grid grid-cols-3 h-24">
                    {allImages.slice(0, 3).map((src, idx) => (
                      <div key={idx} className="relative h-24">
                        <Image
                          src={src}
                          alt="All products"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 30vw"
                          priority={isActive}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Image
                    src={img}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 30vw"
                    priority={isActive}
                  />
                )}
              </div>

              <p className="text-center text-sm font-medium py-2">
                {cat.name === "Frozen Protein" ? "Frozen Foods" : cat.name}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
