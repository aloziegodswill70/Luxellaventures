"use client";

import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Add some products to continue shopping
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
      {/* CART ITEMS */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-xl font-bold mb-4">
          Shopping Cart
        </h1>

        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="border rounded-xl p-5 bg-gray-50 h-fit">
        <h2 className="font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₦{cartTotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between mb-4 text-sm text-gray-500">
          <span>Delivery</span>
          <span>Calculated at checkout</span>
        </div>

        <hr className="mb-4" />

        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>₦{cartTotal.toLocaleString()}</span>
        </div>

        <Link
          href="/checkout"
          className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
