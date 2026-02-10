"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [input, setInput] = useState(searchParams.get("search") || "");
  const [open, setOpen] = useState(false);

  const sort = searchParams.get("sort") || "";
  const wrapRef = useRef(null);

  // ✅ Suggestion list
  const suggestions = useMemo(() => {
    const q = input.trim().toLowerCase();
    if (!q) return [];

    return products
      .filter((p) => {
        const text = `${p.name} ${p.category}`.toLowerCase();
        return text.includes(q);
      })
      .slice(0, 8);
  }, [input]);

  const applySearch = (value) => {
    const v = (value ?? input).trim();
    const params = new URLSearchParams(searchParams.toString());

    if (v) params.set("search", v);
    else params.delete("search");

    router.push(`/?${params.toString()}`, { scroll: false });
    setOpen(false);
  };

  const updateSort = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("sort", value);
    else params.delete("sort");

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div className="sticky top-[112px] bg-white z-30 border-b px-3 py-2">
      <div ref={wrapRef} className="relative flex gap-2">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => input.trim() && setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") applySearch();
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search products"
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />

        <button
          onClick={() => applySearch()}
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

        {/* ✅ Suggestions dropdown */}
        {open && suggestions.length > 0 && (
          <div className="absolute left-0 right-[92px] top-[46px] bg-white border rounded-lg shadow-lg overflow-hidden z-50">
            {suggestions.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setInput(p.name);
                  applySearch(p.name);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
              >
                <span className="truncate">{p.name}</span>
                <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                  {p.category}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
