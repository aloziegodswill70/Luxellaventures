"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white border-b z-40">
      <div className="flex justify-between items-center px-4 h-14 text-xl">
        <Link href="/">☰</Link>
        <Link href="/search">🔍</Link>
        <Link href="/cart">🛒</Link>
        <Link href="/account">👤</Link>
        <Link href="/offers">⭐</Link>
      </div>
    </nav>
  );
}
