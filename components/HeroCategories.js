"use client";

import { Suspense } from "react";
import HeroCategoriesInner from "./HeroCategoriesInner";

export default function HeroCategories(props) {
  return (
    <Suspense fallback={null}>
      <HeroCategoriesInner {...props} />
    </Suspense>
  );
}
