"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
  } = useCart();

  /* ---------------- WHATSAPP MESSAGE (OPTIONAL FALLBACK) ---------------- */
  const whatsappMessage = `
Hello, I want to order:

${cartItems
  .map(
    (item) =>
      `• ${item.name} (x${item.qty}) – £${(
        item.price * item.qty
      ).toFixed(2)}`
  )
  .join("\n")}

Total: £${cartTotal.toFixed(2)}
`;

  const whatsappLink = `https://wa.me/447000000000?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty 🛒
            </p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">
                  £{item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-6 h-6 bg-gray-200 rounded"
                >
                  −
                </button>

                <span className="text-sm font-semibold">
                  {item.qty}
                </span>

                <button
                  onClick={() => addToCart(item)}
                  className="w-6 h-6 bg-orange-500 text-white rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-3">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>£{cartTotal.toFixed(2)}</span>
          </div>

          {/* STRIPE CHECKOUT */}
          {cartItems.length > 0 && (
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Proceed to Checkout
            </Link>
          )}

          {/* WHATSAPP FALLBACK */}
          {cartItems.length > 0 && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border border-green-600 text-green-600 py-3 rounded-lg font-semibold"
            >
              Order via WhatsApp
            </a>
          )}
        </div>
      </div>
    </>
  );
}
