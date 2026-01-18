"use client";

import HeroCategories from "./HeroCategories";
import FilterBar from "./FilterBar";
import ProductGrid from "./ProductGrid";

export default function HomeClient({
  category,
  search,
  sort,
  setCategory,
  setSearch,
  setSort,
}) {
  return (
    <>
      <HeroCategories
        activeCategory={category}
        onSelectCategory={setCategory}
      />

      <FilterBar
        search={search}
        sort={sort}
        setSearch={setSearch}
        setSort={setSort}
      />

      <ProductGrid
        category={category}
        search={search}
        sort={sort}
      />
    </>
  );
}
