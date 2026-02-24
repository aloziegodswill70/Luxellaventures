"use client";

import { Search } from "lucide-react";
import Link from "next/link";

export default function SimpleHero() {
  return (
    <section className="w-full bg-green-600 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Text */}
        <h1 className="text-white text-lg sm:text-2xl md:text-3xl font-semibold text-center sm:text-left">
          Best African food items in UK
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-3">
          
          {/* Shop Now */}
          <Link
            href="/new-products"
            className="bg-white text-green-600 px-5 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>

          {/* Search Icon */}
          <Link
            href="/search"
            className="bg-white p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Search className="text-green-600 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}