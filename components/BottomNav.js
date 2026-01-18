"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartBadge from "./CartBadge";
import { useCart } from "@/context/CartContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLink = (href, icon, label) => {
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
    <div
      className={`fixed bottom-0 w-full bg-white border-t md:hidden z-50
        transition-transform duration-300
        ${show ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div className="flex justify-around items-center h-16">

        {/* Home */}
        {navLink("/", "🏠")}

        {/* Categories (homepage) */}
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

        {/* Shop (products grid on homepage) */}
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

        {/* Cart (opens drawer) */}
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
