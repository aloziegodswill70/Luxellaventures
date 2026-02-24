"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [hasCleared, setHasCleared] = useState(false);

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = (product) => {
    if (!product?.id) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    if (hasCleared) setHasCleared(false);
  };

  /* ---------------- REMOVE FROM CART ---------------- */
  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === productId ? { ...i, qty: Math.max(0, i.qty - 1) } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  /* ---------------- CLEAR CART ---------------- */
  const clearCart = () => {
    setCartItems([]);
    setIsCartOpen(false);
    setIsCheckingOut(false);
    setHasCleared(true);
    if (typeof window !== "undefined") localStorage.removeItem("luxella-cart");
  };

  /* ---------------- DERIVED VALUES ---------------- */
  const cartCount = cartItems.reduce((sum, i) => sum + Number(i.qty || 0), 0);
  const cartTotal = cartItems.reduce(
    (sum, i) => sum + Number(i.price || 0) * Number(i.qty || 0),
    0
  );

  /* ---------------- LOAD FROM LOCAL STORAGE (CLIENT ONLY) ---------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("luxella-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCartItems(parsed);
      }
    } catch {
      localStorage.removeItem("luxella-cart");
    }
  }, []);

  /* ---------------- SAVE TO LOCAL STORAGE ---------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hasCleared) localStorage.setItem("luxella-cart", JSON.stringify(cartItems));
  }, [cartItems, hasCleared]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckingOut,
        setIsCheckingOut,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}