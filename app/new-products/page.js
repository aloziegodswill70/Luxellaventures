"use client"; // ✅ Add this at the very top

import { newProducts } from "@/data/new-products";
import { useCart } from "@/context/CartContext"; // your cart context
import Link from "next/link";

// Layout components
import Navbar from "@/components/Navbar";

export default function NewProductsPage() {
  const { addToCart, openCartDrawer } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1); // add 1 item
    if (openCartDrawer) openCartDrawer(); // safe call
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-[80px] sm:pt-[100px] md:pt-[120px] pb-10">
        {/* pt-[80px] ensures space for fixed navbar on mobile, adjusts for larger screens */}
        <h1 className="text-2xl font-bold mb-6">New Arrivals</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition flex flex-col"
            >
              <Link
                href={`/new-products/${product.id}`}
                className="cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="mt-3 font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.unit}</p>
                <p className="font-bold mt-1">€{product.price}</p>
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-md transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}