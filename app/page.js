import InfoHeader from "@/components/InfoHeader";
import Navbar from "@/components/Navbar";
import HeroCategories from "@/components/HeroCategories";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <main className="pb-20">
      {/* Top info strip */}
      <InfoHeader />

      {/* Main navbar (icons) */}
      <Navbar />

      {/* Category hero slider */}
      <HeroCategories />

      {/* Products */}
      <ProductGrid />
    </main>
  );
}
