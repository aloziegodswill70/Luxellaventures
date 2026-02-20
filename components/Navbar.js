"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link"; // ✅ make sure this is imported
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import CartBadge from "./CartBadge";
import { useCart } from "@/context/CartContext";

const categories = [
  { name: "Fish", slug: "seafood" },
  { name: "Meat", slug: "protein" },
  { name: "Vegetables", slug: "vegetables" },
  { name: "Spices", slug: "spices" },
  { name: "Tubers", slug: "tubers" },
  { name: "Plantain", slug: "plantain" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuWrapRef = useRef(null);

  // Close dropdown on outside click + ESC
  useEffect(() => {
    const onDown = (e) => {
      if (!menuOpen) return;
      const el = menuWrapRef.current;
      if (el && !el.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href) => pathname === href;
  const handleCategoryClick = (slug) => {
    setMenuOpen(false);
    router.push(`/?category=${slug}`);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur border-b z-[999]">
      <div className="flex items-center justify-between px-4 h-14">
        {/* LEFT: Menu + Logo */}
        <div ref={menuWrapRef} className="relative flex items-center gap-3">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Open menu"
            className="w-10 h-10 grid place-items-center rounded-lg active:scale-95 transition"
          >
            <span className="sr-only">Menu</span>
            <span className="block w-5">
              <span className="block h-[2.5px] bg-gray-900 rounded-full mb-1.5" />
              <span className="block h-[2.5px] bg-gray-900 rounded-full mb-1.5" />
              <span className="block h-[2.5px] bg-gray-900 rounded-full" />
            </span>
          </button>

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
            aria-label="Go to home"
          >
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border bg-white">
              <Image
                src="https://res.cloudinary.com/dut0fvswc/image/upload/v1771550892/luxellalogo-removebg-preview_zzpj4q.png" // <-- replace with Cloudinary link
                alt="Luxella Foods"
                fill
                className="object-contain"
                sizes="36px"
                priority
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-extrabold text-gray-900">Luxella</p>
              <p className="text-[11px] text-gray-500 -mt-0.5">African Foods UK</p>
            </div>
          </Link>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute left-0 top-[52px] w-[78vw] max-w-[320px] bg-white border rounded-2xl shadow-xl overflow-hidden z-[1000]">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-bold text-gray-900">Shop Categories</p>
                <p className="text-xs text-gray-500">Quickly jump to products</p>
              </div>
              <div className="py-2">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="border-t" />
              <div className="py-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 active:bg-gray-100"
                >
                  Account
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Cart + Profile */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 rounded-lg grid place-items-center active:scale-95 transition"
            aria-label="Open cart"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H7" />
            </svg>
            {cartCount > 0 && <CartBadge count={cartCount} />}
          </button>

          <Link
            href="/login"
            className={`w-10 h-10 rounded-lg grid place-items-center active:scale-95 transition ${
              isActive("/login") ? "text-orange-600" : "text-gray-800"
            }`}
            aria-label="Account"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}