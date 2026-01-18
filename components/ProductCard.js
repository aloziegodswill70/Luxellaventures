"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart, setIsCartOpen } = useCart();

  const item = cartItems.find((i) => i.id === product.id);
  const qty = item?.qty || 0;

  const handleAdd = () => {
    addToCart(product);
    setIsCartOpen(true); // 🔥 AUTO OPEN
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-3">
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-2 text-sm font-semibold">{product.name}</h3>

      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-green-700">£{product.price}</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => removeFromCart(product.id)}
            disabled={qty === 0}
            className="w-7 h-7 rounded-full bg-gray-200"
          >
            −
          </button>

          <span>{qty}</span>

          <button
            onClick={handleAdd}
            className="w-7 h-7 rounded-full bg-green-600 text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
