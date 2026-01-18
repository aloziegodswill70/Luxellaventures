"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setLoading(true);
    addToCart(product);

    setTimeout(() => setLoading(false), 600);
  };

  return (
    <button
      onClick={handleAdd}
      className={`mt-6 w-full py-3 rounded-lg text-white font-medium transition ${
        loading ? "bg-green-500 scale-95" : "bg-black hover:bg-gray-800"
      }`}
    >
      {loading ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
