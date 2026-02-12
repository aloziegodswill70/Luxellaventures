// app/page.js
"use client";

import { useState, Suspense } from "react";
import InfoHeader from "@/components/InfoHeader";
import Navbar from "@/components/Navbar";
import HeroCategories from "@/components/HeroCategories";
import CategorySlider from "@/components/CategorySlider";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";

// ✅ NEW homepage sections
import HomeHero from "@/components/home/HomeHero";
import FeaturedShowcase from "@/components/home/FeaturedShowcase";
import FeatureStrip from "@/components/home/FeatureStrip";
import PromoBanners from "@/components/home/PromoBanners";
import CTASection from "@/components/home/CTASection";

// ✅ NEW sections we just created
import HotDealsSection from "@/components/home/HotDealsSection";
import PopularThisWeekSection from "@/components/home/PopularThisWeekSection";
import RecommendedForYouSection from "@/components/home/RecommendedForYouSection";


export default function Home() {
  // ✅ MUST be lowercase to match ProductGrid logic
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return (
    <>
      <InfoHeader />
      <Navbar />

      {/* ✅ HERO TOP (premium look) */}
      <HomeHero onShopNow={() => setCategory("all")} />

      {/* ✅ 4 medium-big featured products with "Add to Cart" */}
      <FeaturedShowcase />

      {/* ✅ fast delivery / trust strip */}
      <FeatureStrip />

      {/* 🔥 HOT DEALS (NEW) */}
      <HotDealsSection />

      {/* 🧠 RECOMMENDED (NEW) */}
      <RecommendedForYouSection activeCategory={category} />


      {/* ⭐ POPULAR THIS WEEK (NEW) */}
      <PopularThisWeekSection
        popularIds={[
          "whole-egusi-1kg",
          "fresh-okro-box",
          "fresh-ugu",
          "hake-fish",
          "uncut-ugba",
          "ijebu-garri",
        ]}
      />

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

        {/* ✅ promo cards to populate the page */}
        <PromoBanners />

        {/* 🛒 PRODUCT GRID */}
        <div id="products">
          <ProductGrid
            category={category}
            search={search}
            sort={sort}
          />
        </div>

        {/* 🎠 AUTO-SLIDER CATEGORY SECTION (BODY) */}
        <CategorySlider
          active={category}
          onSelect={setCategory}
        />
      </Suspense>

      {/* ✅ final CTA */}
      <CTASection />
    </>
  );
}
