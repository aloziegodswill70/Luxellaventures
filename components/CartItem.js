"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 border rounded-xl p-4 bg-white">
      <div className="relative w-24 h-24">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-orange-600 font-semibold">
          ₦{item.price.toLocaleString()}
        </p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => removeFromCart(item.id)}
            className="px-3 py-1 border rounded"
          >
            −
          </button>

          <span className="font-semibold">{item.qty}</span>

          <button
            onClick={() => addToCart(item)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="font-semibold">
        ₦{(item.price * item.qty).toLocaleString()}
      </div>
    </div>
  );
}
