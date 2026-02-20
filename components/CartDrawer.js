"use client";

import { useMemo } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

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
      `• ${item.name} (x${item.qty}) – £${(item.price * item.qty).toFixed(2)}`
  )
  .join("\n")}

Total: £${cartTotal.toFixed(2)}
`;

  const whatsappLink = `https://wa.me/447344447897?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  /* ---------------- RELATED ITEMS (AUTO) ---------------- */
  const relatedItems = useMemo(() => {
    if (!cartItems.length) return [];

    const currentProductIds = new Set(products.map((p) => p.id));
    const cleanedCartItems = cartItems.filter((c) =>
      currentProductIds.has(c.id)
    );

    if (!cleanedCartItems.length) return [];

    const cartIds = new Set(cleanedCartItems.map((c) => c.id));
    const cartCategories = new Set(cleanedCartItems.map((c) => c.category));

    const sameCategory = products.filter(
      (p) => cartCategories.has(p.category) && !cartIds.has(p.id)
    );

    const fallback = products.filter((p) => !cartIds.has(p.id));
    const list = sameCategory.length ? sameCategory : fallback;

    const shuffled = [...list].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, [cartItems]);

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
        className={`fixed top-0 right-0 h-full w-[92vw] max-w-[360px] bg-white z-[9999] transform transition-transform duration-300
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ✅ Close Button: make it ABOVE navbar always */}
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Cart Items */}
          <div className="p-4 space-y-4">
            {cartItems.length === 0 && (
              <p className="text-center text-gray-500 mt-10">
                Your cart is empty 🛒
              </p>
            )}

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="min-w-0 pr-3">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    £{Number(item.price).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 bg-gray-200 rounded"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span className="text-sm font-semibold w-5 text-center">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-7 h-7 bg-orange-500 text-white rounded"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Related Items */}
          {cartItems.length > 0 && relatedItems.length > 0 && (
            <div className="border-t px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">You may also like</h3>
                <span className="text-xs text-gray-500">Tap to add</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {relatedItems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="border rounded-lg p-2 text-left hover:border-orange-300 transition"
                  >
                    <div className="relative w-full h-14 rounded-md overflow-hidden bg-gray-50">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <p className="mt-1 text-[11px] font-semibold leading-snug line-clamp-2">
                      {p.name}
                    </p>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] font-bold text-green-700">
                        £{Number(p.price).toFixed(2)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-3 pb-24">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>£{cartTotal.toFixed(2)}</span>
          </div>

          {cartItems.length > 0 && (
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Proceed to Checkout
            </Link>
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
