import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1,2,3,4,5,6].map((i) => (
        <ProductCard key={i} />
      ))}
    </section>
  );
}
