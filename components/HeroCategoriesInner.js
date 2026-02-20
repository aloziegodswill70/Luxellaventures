"use client";

import Image from "next/image";
import { products } from "@/data/products";

/** ---------------- helpers ---------------- */
const norm = (v) => String(v || "").trim();
const keyOf = (v) => norm(v).toLowerCase();

function uniqueBy(arr, getKey) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    const k = getKey(item);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

/** ---------------- category grouping ----------------
 * Maps your product categories to groups
 */
const CATEGORY_GROUPS_ORDER = [
  { label: "Spices", keys: ["spices", "spice", "seasoning", "condiments"] },
  { label: "Pepper", keys: ["pepper", "peppers"] },
  { label: "Fish", keys: ["fish", "seafood"] },
  { label: "Vegetables", keys: ["vegetables", "vegetable", "leafy", "leaves"] },
  { label: "Tubers", keys: ["tubers", "yam", "plantain", "sweet potatoes"] },
  { label: "Meat", keys: ["meat", "protein", "frozen protein", "chicken"] },
  { label: "Chicken", keys: ["chicken"] },
  { label: "Oil", keys: ["oil", "palm oil"] },
];

// Build ordered categories based on your product data
function buildOrderedCategoriesFromProducts(list) {
  const cats = uniqueBy(
    list
      .map((p) => norm(p.category))
      .filter(Boolean),
    (c) => keyOf(c)
  );

  const remaining = new Set(cats.map((c) => keyOf(c)));
  const ordered = [];

  for (const group of CATEGORY_GROUPS_ORDER) {
    const matches = cats.filter((c) =>
      group.keys.some((k) => keyOf(c).includes(k))
    );

    for (const m of matches) {
      const mk = keyOf(m);
      if (remaining.has(mk)) {
        ordered.push(m);
        remaining.delete(mk);
      }
    }
  }

  // Append any leftover categories at the end
  for (const c of cats) {
    const ck = keyOf(c);
    if (remaining.has(ck)) {
      ordered.push(c);
      remaining.delete(ck);
    }
  }

  return ordered;
}

/** ---------------- images ---------------- */
function getCategoryImage(categoryDisplay) {
  const catKey = keyOf(categoryDisplay);
  const p = products.find((x) => keyOf(x.category) === catKey && x.image);
  return p?.image || null;
}

function getVegetablesImage(categoryDisplay) {
  const catKey = keyOf(categoryDisplay);

  // Prefer Ugu
  const ugu = products.find(
    (p) =>
      keyOf(p.category) === catKey &&
      (keyOf(p.name).includes("ugu") || keyOf(p.id).includes("ugu")) &&
      p.image
  );
  if (ugu?.image) return ugu.image;

  // Otherwise pick any veg that's not tomato
  const otherVeg = products.find(
    (p) =>
      keyOf(p.category) === catKey &&
      !keyOf(p.name).includes("tomato") &&
      !keyOf(p.id).includes("tomato") &&
      p.image
  );
  if (otherVeg?.image) return otherVeg.image;

  // Fallback
  const anyVeg = products.find((p) => keyOf(p.category) === catKey && p.image);
  return anyVeg?.image || null;
}

function getAllCollageImages() {
  const seen = new Set();
  const imgs = [];
  for (const p of products) {
    if (!p?.image) continue;
    if (seen.has(p.image)) continue;
    seen.add(p.image);
    imgs.push(p.image);
    if (imgs.length === 3) break;
  }
  return imgs;
}

/** ---------------- build categories ---------------- */
const orderedCategoryNames = buildOrderedCategoriesFromProducts(products);

const categories = [
  { name: "All", value: "all" },
  ...orderedCategoryNames.map((cat) => ({ name: cat, value: cat })),
];

export default function CategoriesInner({ active, onSelect }) {
  const allImages = getAllCollageImages();

  return (
    <section className="sticky top-14 bg-white z-40 border-b">
      <div className="flex gap-3 overflow-x-auto px-4 py-4 scrollbar-hide">
        {categories.map((cat) => {
          const isActive =
            active === cat.value ||
            (active === "all" && cat.value === "all");

          let img = null;
          if (cat.value !== "all") {
            img = keyOf(cat.value).includes("vegetables")
              ? getVegetablesImage(cat.value)
              : getCategoryImage(cat.value);
          }

          return (
            <button
              key={keyOf(cat.value)}
              onClick={() => onSelect(cat.value)}
              className={`min-w-[45%] sm:min-w-[30%] rounded-xl border transition overflow-hidden
                ${isActive
                  ? "border-orange-400 ring-2 ring-orange-200"
                  : "border-gray-200 hover:border-orange-300"
                }`}
            >
              <div className="relative h-24 bg-gray-100">
                {cat.value === "all" ? (
                  <div className="grid grid-cols-3 h-24">
                    {allImages.map((src, idx) => (
                      <div key={src || idx} className="relative h-24">
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
                ) : img ? (
                  <Image
                    src={img}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 30vw"
                    priority={isActive}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    No image
                  </div>
                )}
              </div>

              <p className="text-center text-sm font-medium py-2">{cat.name}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}