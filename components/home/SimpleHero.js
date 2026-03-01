"use client";

import { Search } from "lucide-react";
import Link from "next/link";

export default function SimpleHero() {
  return (
    <section className="relative w-full overflow-hidden py-14 px-4 bg-gradient-to-r from-green-600 via-green-500 to-green-700 animate-gradient">
      
      {/* Animated Glow Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,white,transparent_40%)] animate-pulse" />

      <div className="relative max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Text */}
        <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left leading-tight animate-glow">
          Best <span className="text-orange-400">African Food</span> Items in UK
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Shop Now */}
          <Link
            href="/new-products"
            className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-white hover:text-orange-600 hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </Link>

          {/* Search Icon */}
          <Link
            href="/search"
            className="bg-white text-orange-500 p-3 rounded-md shadow-lg hover:bg-orange-500 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <Search className="w-5 h-5" />
          </Link>

        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-glow {
          animation: glowPulse 2.5s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% {
            text-shadow: 0 0 5px rgba(255,255,255,0.6),
                         0 0 10px rgba(255,255,255,0.4);
          }
          50% {
            text-shadow: 0 0 15px rgba(255,255,255,0.9),
                         0 0 25px rgba(255,255,255,0.7);
          }
        }
      `}</style>

    </section>
  );
}