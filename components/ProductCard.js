"use client";

import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, increaseQty, decreaseQty, cartItems } = useCart();

  const itemInCart = cartItems.find((i) => i.id === product.id);

  return (
    <div className="border rounded-lg p-3">
      <img src={product.image} alt={product.name} className="rounded" />

      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600">£{product.price}</p>

      {!itemInCart ? (
        <button
          onClick={() => addToCart(product)}
          className="mt-2 w-full bg-green-600 text-white py-2 rounded"
        >
          Add to cart
        </button>
      ) : (
        <div className="flex items-center justify-between mt-2">
          <button onClick={() => decreaseQty(product.id)}>➖</button>
          <span>{itemInCart.qty}</span>
          <button onClick={() => increaseQty(product.id)}>➕</button>
        </div>
      )}
    </div>
  );
}
