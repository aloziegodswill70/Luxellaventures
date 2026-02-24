"use client";

import { useMemo, useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { products } from "@/data/products";

export default function CartDrawer() {
  const { cartItems, cartTotal, isCartOpen, setIsCartOpen, addToCart, removeFromCart } =
    useCart();

  // ✅ Prevent hydration issues
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);

  // Related items
  const relatedItems = useMemo(() => {
    if (!cartItems.length) return [];
    const cartIds = new Set(cartItems.map((c) => c.id));
    const cartCategories = new Set(cartItems.map((c) => c.category));

    const sameCategory = products.filter(
      (p) => cartCategories.has(p.category) && !cartIds.has(p.id)
    );
    const fallback = products.filter((p) => !cartIds.has(p.id));

    const list = sameCategory.length ? sameCategory : fallback;
    return [...list].sort(() => Math.random() - 0.5).slice(0, 6);
  }, [cartItems]);

  const whatsappMessage = `Hello, I want to order:\n\n${cartItems
    .map((item) => `• ${item.name} (x${item.qty}) – £${(item.price * item.qty).toFixed(2)}`)
    .join("\n")}\n\nTotal: £${cartTotal.toFixed(2)}`;

  const whatsappLink = `https://wa.me/447344447897?text=${encodeURIComponent(whatsappMessage)}`;

  if (!isHydrated) return null; // Render only on client

  return (
    <>
      {/* Overlay */}
      {isCartOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsCartOpen(false)} />}

      <div
        className={`fixed top-0 right-0 h-full w-[92vw] max-w-[360px] bg-white z-[9999] transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close */}
        <button
          onClick={() => setIsCartOpen(false)}
          aria-label="Close cart"
          className="fixed right-3 top-3 z-[10000] w-10 h-10 rounded-full bg-white border shadow flex items-center justify-center text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b pr-14">
          <h2 className="font-bold text-lg">Your Cart</h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your cart is empty 🛒</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="min-w-0 pr-3">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">£{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 bg-gray-200 rounded">
                    −
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                  <button onClick={() => addToCart(item)} className="w-7 h-7 bg-orange-500 text-white rounded">
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Related items */}
        {cartItems.length > 0 && relatedItems.length > 0 && (
          <div className="border-t px-4 py-4">
            <h3 className="font-semibold text-sm mb-2">You may also like</h3>
            <div className="grid grid-cols-3 gap-2">
              {relatedItems.map((p) => (
                <button key={p.id} onClick={() => addToCart(p)} className="border rounded-lg p-2 hover:border-orange-300 transition">
                  <div className="relative w-full h-14 rounded-md overflow-hidden bg-gray-50">
                    {p.image ? <Image src={p.image} alt={p.name} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No image</div>}
                  </div>
                  <p className="mt-1 text-[11px] font-semibold line-clamp-2">{p.name}</p>
                  <span className="text-[11px] font-bold text-green-700">£{p.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t p-4 space-y-3 pb-24">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>£{cartTotal.toFixed(2)}</span>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={() => {
                setIsCartOpen(false);
                window.location.href = "/checkout"; // safe navigation
              }}
              className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Proceed to Checkout
            </button>
          )}

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