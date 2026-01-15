"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, removeFromCart, cart = [] } = useCart();

  const item = cart.find((i) => i.id === product.id);
  const qty = item?.quantity || 0;

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
      <p className="text-xs text-gray-500">{product.description}</p>

      <div className="flex items-center justify-between mt-2">
        <span className="font-bold text-green-700">
          £{product.price}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => removeFromCart(product)}
            className="w-7 h-7 rounded-full bg-gray-200"
          >
            −
          </button>
          <span className="text-sm">{qty}</span>
          <button
            onClick={() => addToCart(product)}
            className="w-7 h-7 rounded-full bg-green-600 text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
