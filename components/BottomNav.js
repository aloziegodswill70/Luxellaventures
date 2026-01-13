"use client";
import Link from "next/link";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full bg-white border-t md:hidden z-50">
      <div className="flex justify-around items-center h-16 text-2xl">
        <Link href="/">🏠</Link>
        <Link href="/categories">📦</Link>
        <Link href="/shop">🛍</Link>
        <Link href="/cart">🛒</Link>
        <Link href="/account">👤</Link>
      </div>
    </div>
  );
}
