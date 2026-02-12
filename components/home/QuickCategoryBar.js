// components/home/QuickCategoryBar.js
"use client";

const quickCategories = [
  { label: "Home", value: "all" },
  { label: "Fish", value: "Fish" },
  { label: "Meat", value: "Protein" },
  { label: "Vegetables", value: "Vegetables" },
  { label: "Spices", value: "Spices" },
];

export default function QuickCategoryBar({ active, onSelect }) {
  return (
    <section className="sticky top-[112px] z-40 bg-white border-b">
      <div className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide">
        {quickCategories.map((cat) => {
          const isActive = active === cat.value;

          return (
            <button
              key={cat.value}
              onClick={() => {
                onSelect(cat.value);

                // scroll to products
                const el = document.getElementById("products");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition
                ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
