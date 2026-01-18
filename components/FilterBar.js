"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [input, setInput] = useState(
    searchParams.get("search") || ""
  );

  const sort = searchParams.get("sort") || "";

  const applySearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (input) {
      params.set("search", input);
    } else {
      params.delete("search");
    }

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const updateSort = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("sort", value);
    else params.delete("sort");

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="sticky top-[112px] bg-white z-30 border-b px-3 py-2 flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && applySearch()}
        placeholder="Search products"
        className="flex-1 border rounded-lg px-3 py-2 text-sm"
      />

      <button
        onClick={applySearch}
        className="px-4 rounded-lg bg-orange-500 text-white text-sm"
      >
        🔍
      </button>

      <select
        value={sort}
        onChange={(e) => updateSort(e.target.value)}
        className="border rounded-lg px-2 text-sm"
      >
        <option value="">Sort</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
      </select>
    </div>
  );
}
