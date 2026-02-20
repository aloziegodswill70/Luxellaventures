"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";

export default function HomeProductsClient({ initialCategory = "all" }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const queryCategory = searchParams.get("category");
  const activeCategory = queryCategory || category;

  const quickCats = useMemo(
    () => [
      { label: "Home", value: "all" },
      { label: "Fish", value: "Seafood" },
      { label: "Meat", value: "Protein" },
      { label: "Vegetables", value: "Vegetables" },
      { label: "Spices", value: "Spices" },
      { label: "Tubers", value: "Tubers" },
    ],
    []
  );

  const handleQuickCat = (val) => {
    if (val === "all") {
      setCategory("all");
      window?.scrollTo?.({ top: 0, behavior: "smooth" });
      return;
    }
    setCategory(String(val).toLowerCase());
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* SEARCH BAR */}
      <div className="mt-4 px-4 sm:px-6 md:px-8">
        <FilterBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
      </div>

      {/* QUICK CATEGORIES */}
      <section className="px-4 -mt-1">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-3">
          {quickCats.map((c) => {
            const isActive = activeCategory === (c.value === "all" ? "all" : String(c.value).toLowerCase());
            return (
              <button
                key={c.label}
                onClick={() => handleQuickCat(c.value)}
                className={`whitespace-nowrap text-sm font-semibold transition
                  ${isActive ? "text-orange-600" : "text-gray-600 hover:text-gray-900"}`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <div id="products" className="px-4 sm:px-6 md:px-8 mt-4">
        <ProductGrid category={activeCategory} search={search} sort={sort} />
      </div>

      {/* CATEGORY SLIDER */}
      <CategorySlider active={activeCategory} onSelect={setCategory} />
    </>
  );
}