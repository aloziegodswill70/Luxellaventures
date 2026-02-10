"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function RelatedProducts({ category, excludeId, onAdd }) {
  const related = products
    .filter((p) => p.category === category && p.id !== excludeId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold mb-2">You may also like</p>
      <div className="grid grid-cols-2 gap-3">
        {related.map((p) => (
          <div key={p.id} className="border rounded-xl p-2">
            <ProductCard product={p} />
            <button
              onClick={() => onAdd(p)}
              className="mt-2 w-full text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
