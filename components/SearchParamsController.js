"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import HomeClient from "./HomeClient";
import { products } from "@/data/products";

// 🔹 Utility for normalized search
const normalize = (str = "") => str.toString().toLowerCase().trim();

// 🔹 Smarter search matching (from previous step)
const searchProducts = (products, query) => {
  const q = normalize(query);
  if (!q) return [];

  return products
    .map((p) => {
      const name = normalize(p.name);
      const category = normalize(p.category);
      const unit = normalize(p.unit);
      const id = normalize(p.id);

      let score = 0;
      if (name.startsWith(q)) score += 5;
      if (name.includes(q)) score += 3;
      if (category.includes(q)) score += 2;
      if (unit.includes(q)) score += 1;
      if (id.includes(q)) score += 1;

      return { product: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
};

export default function SearchParamsController() {
  const params = useSearchParams();
  const router = useRouter();

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // 🔹 Update state when URL params change
  useEffect(() => {
    setCategory(params.get("category") || "all");
    setSearch(params.get("search") || "");
    setSort(params.get("sort") || "");
  }, [params]);

  // 🔹 Update URL params and keep search consistent
  const updateParams = (key, value) => {
    const sp = new URLSearchParams(params.toString());
    value ? sp.set(key, value) : sp.delete(key);
    router.push(`?${sp.toString()}`, { scroll: false });
  };

  // 🔹 Compute filtered products for HomeClient
  const filteredProducts = useMemo(() => {
    // Apply category filter first
    const cat = normalize(category);
    let result = products;

    if (cat !== "all") {
      result = result.filter((p) => normalize(p.category) === cat);
    }

    // Apply search filter
    if (search?.trim()) {
      result = searchProducts(result, search);
    }

    // Sorting logic (if any)
    if (sort === "price-asc") result = result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = result.sort((a, b) => b.price - a.price);

    return result;
  }, [category, search, sort]);

  return (
    <HomeClient
      category={category}
      search={search}
      sort={sort}
      products={filteredProducts}
      setCategory={(v) => updateParams("category", v)}
      setSearch={(v) => updateParams("search", v)}
      setSort={(v) => updateParams("sort", v)}
    />
  );
}