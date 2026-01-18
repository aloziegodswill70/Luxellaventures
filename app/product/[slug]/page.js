import { products } from "@/data/products";
import Image from "next/image";

export default function ProductPage({ params }) {
  const product = products.find((p) => p.id === params.slug);

  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="p-4">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <h1 className="text-xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-green-700 font-bold mt-3">£{product.price}</p>
    </div>
  );
}
