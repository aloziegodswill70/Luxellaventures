"use client";

import Image from "next/image";

export default function SearchSuggestions({
  query,
  results = [],
  onPick,
  onClose,
}) {
  if (!query?.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
      {results.length === 0 ? (
        <div className="p-4 text-sm text-gray-500">No matches found.</div>
      ) : (
        results.slice(0, 8).map((p) => (
          <button
            key={p.id}
            onClick={() => onPick(p)}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border">
              <Image
                src={p.images?.[0] || p.image}
                alt={p.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{p.name}</p>
              <p className="text-xs text-gray-500">{p.category}</p>
            </div>

            <p className="text-sm font-semibold">£{Number(p.price).toFixed(2)}</p>
          </button>
        ))
      )}

      <button
        onClick={onClose}
        className="w-full text-xs text-gray-600 py-2 border-t hover:bg-gray-50"
      >
        Close
      </button>
    </div>
  );
}
