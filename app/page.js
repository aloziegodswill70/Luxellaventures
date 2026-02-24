import { Suspense } from "react";

import InfoHeader from "@/components/InfoHeader";
import Navbar from "@/components/Navbar";



// ✅ SIMPLE HERO
import SimpleHero from "@/components/home/SimpleHero";

// ✅ SLIDERS ADDED BACK
import FreshVegPromoSlider from "@/components/home/FreshVegPromoSlider";
import PromoDealsSlider from "@/components/PromoDealsSlider";

import PromoBanners from "@/components/home/PromoBanners";
import CTASection from "@/components/home/CTASection";
import HotDealsSection from "@/components/home/HotDealsSection";
import PopularThisWeekSection from "@/components/home/PopularThisWeekSection";
import RecommendedForYouSection from "@/components/home/RecommendedForYouSection";

import HomeProductsClient from "@/components/HomeProductsClient";
import SwanseaNoticeModal from "@/components/SwanseaNoticeModal";

export default function Home() {
  return (
    <>
      {/* Swansea Delivery Popup */}
      <SwanseaNoticeModal />

      <InfoHeader />
      <Navbar />

      {/* ✅ SIMPLE HERO */}
      <SimpleHero />

      {/* ✅ PROMO SLIDERS */}
      <FreshVegPromoSlider />
      <PromoDealsSlider />

      {/* Core Selling Sections */}
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

      {/* Product Grid */}
      <Suspense
        fallback={
          <div className="text-center py-10">Loading products...</div>
        }
      >
        <HomeProductsClient initialCategory="all" />
      </Suspense>

      {/* Marketing Sections */}
      <PromoBanners />
      <CTASection />
    </>
  );
}