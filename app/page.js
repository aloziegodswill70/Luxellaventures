"use client";

import { useState, Suspense } from "react";
import InfoHeader from "@/components/InfoHeader";
import Navbar from "@/components/Navbar";
import HeroCategories from "@/components/HeroCategories";
import CategorySlider from "@/components/CategorySlider";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  // ✅ MUST be lowercase to match ProductGrid logic
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return (
    <>
      <InfoHeader />
      <Navbar />

      {/* ✅ REQUIRED Suspense boundary for useSearchParams */}
      <Suspense fallback={null}>
        {/* 🔒 STICKY CATEGORY FILTER (TOP) */}
        <HeroCategories
          activeCategory={category}
          onSelectCategory={setCategory}
        />

        {/* 🔍 SEARCH + SORT */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

        {/* 🛒 PRODUCT GRID */}
        <ProductGrid
          category={category}
          search={search}
          sort={sort}
        />

        {/* 🎠 AUTO-SLIDER CATEGORY SECTION (BODY) */}
        <CategorySlider
          active={category}
          onSelect={setCategory}
        />
      </Suspense>
    </>
  );
}
