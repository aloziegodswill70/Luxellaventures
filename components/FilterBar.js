"use client";

import { useRouter } from "next/navigation";

export default function FilterBar({ search = "", sort = "" }) {
  const router = useRouter();

  const updateParam = (key, value) => {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="sticky top-[112px] bg-white z-30 border-b px-3 py-2 flex gap-2">
      <input
        value={search}
        onChange={(e) => updateParam("search", e.target.value)}
        placeholder="Search products"
        className="flex-1 border rounded-lg px-3 py-2 text-sm"
      />

      <select
        value={sort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="border rounded-lg px-2 text-sm"
      >
        <option value="">Sort</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
      </select>
    </div>
  );
}
