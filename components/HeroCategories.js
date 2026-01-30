"use client";

import { Suspense } from "react";
import HeroCategoriesInner from "./HeroCategoriesInner";

export default function HeroCategories({
  activeCategory,
  onSelectCategory,
}) {
  return (
    <Suspense fallback={null}>
      <HeroCategoriesInner
        active={activeCategory}
        onSelect={onSelectCategory}
      />
    </Suspense>
  );
}