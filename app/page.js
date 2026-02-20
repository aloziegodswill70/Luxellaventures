import { Suspense } from "react";

import InfoHeader from "@/components/InfoHeader";
import Navbar from "@/components/Navbar";
import FreshVegPromoSlider from "@/components/home/FreshVegPromoSlider";
import HomeHero from "@/components/home/HomeHero";
import FeaturedShowcase from "@/components/home/FeaturedShowcase";
import FeatureStrip from "@/components/home/FeatureStrip";
import PromoBanners from "@/components/home/PromoBanners";
import CTASection from "@/components/home/CTASection";
import HotDealsSection from "@/components/home/HotDealsSection";
import PopularThisWeekSection from "@/components/home/PopularThisWeekSection";
import RecommendedForYouSection from "@/components/home/RecommendedForYouSection";

import HomeProductsClient from "@/components/HomeProductsClient";

export default function Home() {
  return (
    <>
      <InfoHeader />
      <Navbar />

      {/* FRESH VEG SLIDER */}
      <FreshVegPromoSlider />

      {/* HERO / BANNERS */}
      <HomeHero />
      <FeaturedShowcase />
      <FeatureStrip />
      <HotDealsSection />
      <RecommendedForYouSection />
      <PopularThisWeekSection
        popularIds={[
          "egusi-whole",
          "fresh-okro-box-1kg",
          "fresh-ugu",
          "hake-fish",
          "ugba",
          "garri",
        ]}
      />
      <PromoBanners />

      {/* CLIENT-SIDE FILTER + GRID (wrapped in Suspense) */}
      <Suspense fallback={<div className="text-center py-10">Loading products...</div>}>
        <HomeProductsClient initialCategory="all" />
      </Suspense>

      <CTASection />
    </>
  );
}