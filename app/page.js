import InfoHeader from "@/components/InfoHeader";
import Navbar from "@/components/Navbar";
import HeroCategories from "@/components/HeroCategories";

export default function Home() {
  return (
    <>
      <InfoHeader />
      <Navbar />
      <HeroCategories />

      {/* Product Section placeholder */}
      <section className="px-4 py-10 text-center text-gray-500">
        🛒 Products coming next
      </section>
    </>
  );
}
