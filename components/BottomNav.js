"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartBadge from "./CartBadge";
import { useCart } from "@/context/CartContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  const navLink = (href, icon) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`relative flex flex-col items-center justify-center
          ${isActive ? "text-green-600 scale-110" : "text-gray-500"}
          active:scale-95 transition`}
      >
        <span className="text-2xl">{icon}</span>
        {isActive && (
          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1" />
        )}
      </Link>
    );
  };

  return (
    <div className="fixed bottom-0 w-full bg-white border-t md:hidden z-50">
      <div className="flex justify-around items-center h-16">

        {/* Home */}
        {navLink("/", "🏠")}

        {/* Categories */}
        <button
          onClick={() =>
            document
              .querySelector("#categories")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center text-gray-500 active:scale-95 transition"
        >
          <span className="text-2xl">📦</span>
        </button>

        {/* Products */}
        <button
          onClick={() =>
            document
              .querySelector("#products")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center text-gray-500 active:scale-95 transition"
        >
          <span className="text-2xl">🛍</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center text-gray-500 active:scale-95 transition"
        >
          <span className="text-2xl">🛒</span>
          {cartCount > 0 && <CartBadge count={cartCount} />}
        </button>

        {/* Account */}
        {navLink("/login", "👤")}

      </div>
    </div>
  );
}
