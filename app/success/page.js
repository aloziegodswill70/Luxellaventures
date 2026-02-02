"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function SuccessPage() {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md bg-white border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your order. Your payment was
          successful and we’ll contact you shortly.
        </p>

        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
