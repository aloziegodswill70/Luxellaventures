"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartBadge from "./CartBadge";
import { useCart } from "@/context/CartContext";

const categories = [
  { name: "Frozen Foods", slug: "frozen" },
  { name: "Proteins", slug: "proteins" },
  { name: "Tubers", slug: "tubers" },
  { name: "Grains", slug: "grains" },
  { name: "Peppers", slug: "peppers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItem = (href, icon, isCart = false) => {
    const isActive = pathname === href;

    if (isCart) {
      return (
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center"
        >
          <span className="text-xl">{icon}</span>
          {cartCount > 0 && <CartBadge count={cartCount} />}
        </button>
      );
    }

    return (
      <Link
        href={href}
        className={`flex flex-col items-center ${
          isActive ? "text-orange-500" : "text-gray-700"
        }`}
      >
        <span className="text-xl">{icon}</span>
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b z-[999]">
      <div className="flex justify-between items-center px-4 h-14 relative">

        {/* ☰ MENU */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col items-center text-gray-700"
          >
            <span className="text-xl">☰</span>
          </button>

          {menuOpen && (
            <div className="absolute left-0 top-12 bg-white border rounded-lg shadow-lg w-48 z-[1000]">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/?category=${cat.slug}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}

              <div className="border-t my-1" />

              <Link href="/search" className="block px-4 py-2 text-sm hover:bg-gray-100">
                🔍 Search
              </Link>
              <Link href="/offers" className="block px-4 py-2 text-sm hover:bg-gray-100">
                ⭐ Offers
              </Link>
              <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">
                👤 Account
              </Link>
            </div>
          )}
        </div>

        {navItem("/search", "🔍")}
        {navItem("/cart", "🛒", true)}
        {navItem("/login", "👤")}
        {navItem("/offers", "⭐")}
      </div>
    </nav>
  );
}
