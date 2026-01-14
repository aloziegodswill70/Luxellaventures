"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartBadge from "./CartBadge";

export default function Navbar() {
  const pathname = usePathname();

  // TEMP cart count (replace later)
  const cartCount = 3;

  const navItem = (href, icon, isCart = false) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`relative flex flex-col items-center justify-center
          transition-all duration-200
          ${isActive ? "text-green-600 scale-110" : "text-gray-700"}
        `}
      >
        <span className="text-xl">{icon}</span>

        {isCart && <CartBadge count={cartCount} />}

        {isActive && (
          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1"></span>
        )}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 bg-white border-b z-40">
      <div className="flex justify-between items-center px-4 h-14">

        {navItem("/", "☰")}
        {navItem("/search", "🔍")}
        {navItem("/cart", "🛒", true)}
        {navItem("/account", "👤")}
        {navItem("/offers", "⭐")}

      </div>
    </nav>
  );
}
