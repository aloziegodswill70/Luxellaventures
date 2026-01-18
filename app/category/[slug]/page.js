import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/Navbar";
import InfoHeader from "@/components/InfoHeader";

export async function generateMetadata({ params }) {
  const name = params.slug.replace("-", " ");

  return {
    title: `${name} Products | Luxella Foods`,
    description: `Shop quality ${name} food items at affordable prices.`,
  };
}

export default function CategoryPage({ params }) {
  const { slug } = params;

  return (
    <>
      <InfoHeader />
      <Navbar />

      <section className="px-4 py-4">
        <h1 className="text-xl font-bold capitalize">
          {slug.replace("-", " ")}
        </h1>
        <p className="text-sm text-gray-500">
          Fresh & affordable {slug.replace("-", " ")} products
        </p>
      </section>

      {/* Pass category via URL params automatically */}
      <ProductGrid forcedCategory={slug} />
    </>
  );
}
