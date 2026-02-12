// components/home/HomeClient.js
"use client";

import { useMemo, useState } from "react";
import InfoHeader from "@/components/InfoHeader";
import Navbar from "@/components/Navbar";
import HeroCategories from "@/components/HeroCategories";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import HomeHero from "@/components/home/HomeHero";
import FeatureStrip from "@/components/home/FeatureStrip";
import FeaturedShowcase from "@/components/home/FeaturedShowcase";
import PromoBanners from "@/components/home/PromoBanners";
import CTASection from "@/components/home/CTASection";

export default function HomeClient() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return (
    <>
      <InfoHeader />
      <Navbar />

      {/* HERO */}
      <HomeHero onShopNow={() => setCategory("all")} />

      {/* 4 BIG SHOWCASE PRODUCTS */}
      <FeaturedShowcase />

      {/* FAST DELIVERY + TRUST STRIP */}
      <FeatureStrip />

      {/* CATEGORY FILTER */}
      <HeroCategories active={category} onSelect={setCategory} />

      {/* SEARCH + SORT */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {/* PROMO BANNERS (adds “fullness”) */}
      <PromoBanners />

      {/* PRODUCT GRID */}
      <ProductGrid category={category} search={search} sort={sort} />

      {/* SLIDER */}
      <CategorySlider active={category} onSelect={setCategory} />

      {/* CTA */}
      <CTASection />
    </>
  );
}
