import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function ProductGrid() {
  return (
    <section className="px-3 py-4">
      <h2 className="text-lg font-bold mb-3">Shop Products</h2>

      <div
        className="
          grid
          grid-cols-2          /* default mobile = 2 */
          sm:grid-cols-3       /* larger phones = 3 */
          md:grid-cols-4       /* tablets */
          lg:grid-cols-5       /* desktop */
          gap-3
        "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
