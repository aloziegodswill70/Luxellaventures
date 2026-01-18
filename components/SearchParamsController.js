"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HomeClient from "./HomeClient";

export default function SearchParamsController() {
  const params = useSearchParams();
  const router = useRouter();

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setCategory(params.get("category") || "all");
    setSearch(params.get("search") || "");
    setSort(params.get("sort") || "");
  }, [params]);

  const updateParams = (key, value) => {
    const sp = new URLSearchParams(params.toString());
    value ? sp.set(key, value) : sp.delete(key);
    router.push(`?${sp.toString()}`, { scroll: false });
  };

  return (
    <HomeClient
      category={category}
      search={search}
      sort={sort}
      setCategory={(v) => updateParams("category", v)}
      setSearch={(v) => updateParams("search", v)}
      setSort={(v) => updateParams("sort", v)}
    />
  );
}
