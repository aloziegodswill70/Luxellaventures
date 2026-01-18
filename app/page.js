"use client";

import { useState } from "react";
import InfoHeader from "@/components/InfoHeader";
import Navbar from "@/components/Navbar";
import HeroCategories from "@/components/HeroCategories";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import { Suspense } from "react";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return (
    <>
      <InfoHeader />
      <Navbar />
      <Suspense fallback={null}>
      <HeroCategories
        activeCategory={category}
        onSelectCategory={setCategory}
      />

      <FilterBar search={search} sort={sort} />

      <ProductGrid
        category={category}
        search={search}
        sort={sort}
      />
       </Suspense>
    </>
  );
}
