"use client";

import { Suspense } from "react";
import HeroCategoriesInner from "./HeroCategoriesInner";

/**
 * HeroCategories
 * ----------------
 * Wrapper for HeroCategoriesInner with Suspense.
 * Keeps active category in sync with homepage quick categories and product grid.
 */
export default function HeroCategories({ activeCategory, onSelectCategory }) {
  return (
    <Suspense fallback={null}>
      <HeroCategoriesInner
        active={activeCategory}
        onSelect={onSelectCategory}
      />
    </Suspense>
  );
}