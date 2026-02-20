"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

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
    <div
      className="
        fixed bottom-0 left-0 right-0
        w-full
        bg-white/95 supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:backdrop-blur
        border-t
        md:hidden
        z-[9999]
      "
    >
      <div className="flex justify-between items-center h-16 px-4">
        
        {/* Home */}
        {navLink("/", "🏠")}

        {/* Categories */}
        <Link
          href="#categories"
          className="flex flex-col items-center text-gray-500 active:scale-95 transition"
        >
          <span className="text-2xl">📦</span>
        </Link>

        {/* Products */}
        <Link
          href="#products"
          className="flex flex-col items-center text-gray-500 active:scale-95 transition"
        >
          <span className="text-2xl">🛍</span>
        </Link>

        {/* Delivery */}
        {navLink("/delivery", "🚚")}

      </div>
    </div>
  );
}