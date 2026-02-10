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

  const whatsappLink = `https://wa.me/447000000000?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  /* ---------------- RELATED ITEMS (AUTO) ---------------- */
  const relatedItems = useMemo(() => {
    if (!cartItems.length) return [];

    const cartIds = new Set(cartItems.map((c) => c.id));
    const cartCategories = new Set(cartItems.map((c) => c.category));

    // Prefer same-category items, exclude items already in cart
    const sameCategory = products.filter(
      (p) => cartCategories.has(p.category) && !cartIds.has(p.id)
    );

    // Fallback: just pick any products not in cart
    const fallback = products.filter((p) => !cartIds.has(p.id));

    const list = sameCategory.length ? sameCategory : fallback;

    // Shuffle lightly and pick a few
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
              <div
                key={item.id}
                className="flex justify-between items-center"
              >
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">
                    {item.name}
                  </p>
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

          {/* Related Items */}
          {cartItems.length > 0 && relatedItems.length > 0 && (
            <div className="border-t px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">
                  You may also like
                </h3>
                <span className="text-xs text-gray-500">
                  Tap to add
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {relatedItems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="border rounded-xl p-2 text-left hover:border-orange-300 transition"
                  >
                    <div className="relative w-full h-20 rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p className="mt-2 text-xs font-semibold line-clamp-2">
                      {p.name}
                    </p>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-green-700">
                        £{Number(p.price).toFixed(2)}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {p.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
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
