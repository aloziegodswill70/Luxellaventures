"use client";

import {
  FaFish,
  FaLeaf,
  FaFireAlt,
  FaPepperHot,
  FaTint,
  FaBoxOpen,
  FaDrumstickBite,
} from "react-icons/fa";

export default function CategoriesBar({ products, active, onSelect }) {
  // Build category counts dynamically
  const categoryMap = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const categories = [
    { name: "All", icon: <FaBoxOpen />, count: products.length },
    { name: "Fish", icon: <FaFish />, count: categoryMap["Fish"] || 0 },
    {
      name: "Frozen Protein",
      icon: <FaDrumstickBite />,
      count: categoryMap["Frozen Protein"] || 0,
    },
    {
      name: "Protein",
      icon: <FaDrumstickBite />,
      count: categoryMap["Protein"] || 0,
    },
    { name: "Chicken", icon: <FaDrumstickBite />, count: categoryMap["Chicken"] || 0 },
    { name: "Garri", icon: <FaLeaf />, count: categoryMap["Garri"] || 0 },
    { name: "Yam", icon: <FaFireAlt />, count: categoryMap["Yam"] || 0 },
    { name: "Plantain", icon: <FaLeaf />, count: categoryMap["Plantain"] || 0 },
    { name: "Pepper", icon: <FaPepperHot />, count: categoryMap["Pepper"] || 0 },
    { name: "Vegetables", icon: <FaLeaf />, count: categoryMap["Vegetables"] || 0 },
    { name: "Oil", icon: <FaTint />, count: categoryMap["Oil"] || 0 },
  ].filter((c) => c.count > 0); // hide empty categories

  return (
    <section className="w-full overflow-x-auto py-4">
      <div className="flex gap-4 px-4 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className={`flex flex-col items-center justify-center min-w-[100px] rounded-xl p-3 border transition
              ${
                active === cat.name
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50"
              }
            `}
          >
            <span className="text-2xl mb-1">{cat.icon}</span>
            <span className="text-sm font-semibold">{cat.name}</span>
            <span className="text-xs opacity-80">{cat.count} items</span>
          </button>
        ))}
      </div>
    </section>
  );
}