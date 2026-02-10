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

  // ✅ Supports new multi-image format + old single image format
  const mainImage =
    (Array.isArray(product?.images) && product.images[0]) ||
    product?.image ||
    "/images/placeholder.png"; // add this image in /public/images if you want

  return (
    <div className="bg-white rounded-xl shadow-sm p-3">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
        <Image
          src={mainImage}
          alt={product?.name || "Product image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <h3 className="mt-2 text-sm font-semibold line-clamp-2">
        {product.name}
      </h3>

      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-green-700">
          £{Number(product.price || 0).toFixed(2)}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => removeFromCart(product.id)}
            disabled={qty === 0}
            className={`w-7 h-7 rounded-full bg-gray-200 ${
              qty === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            −
          </button>

          <span className="min-w-[18px] text-center">{qty}</span>

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
