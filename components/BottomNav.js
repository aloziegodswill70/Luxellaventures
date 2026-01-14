"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartBadge from "./CartBadge";

export default function BottomNav() {
  const pathname = usePathname();

  // TEMP cart count (replace later with context)
  const cartCount = 3;

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

  const navItem = (href, icon, isCart = false) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`relative flex flex-col items-center justify-center
          transition-all duration-200
          ${isActive
            ? "text-green-600 scale-110"
            : "text-gray-500 active:scale-95"
          }
        `}
      >
        <span className="text-2xl">{icon}</span>

        {isCart && <CartBadge count={cartCount} />}

        {isActive && (
          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1"></span>
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

        {navItem("/", "🏠")}
        {navItem("/categories", "📦")}
        {navItem("/shop", "🛍")}
        {navItem("/cart", "🛒", true)}
        {navItem("/account", "👤")}

      </div>
    </div>
  );
}
