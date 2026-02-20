// components/Footer.js
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-black mt-20 relative">

      {/* 🔼 Back To Top Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center
                     shadow-lg hover:bg-gray-800 active:scale-95 transition"
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h3 className="text-lg font-extrabold tracking-wide">
            Luxella Foods
          </h3>
          <p className="mt-4 text-sm font-semibold leading-relaxed">
            African food supply you can trust. Fresh, fast and delivered to your doorstep across the UK.
          </p>
        </div>

        {/* Company */}
        <div className="space-y-4">
          <h4 className="text-sm font-extrabold uppercase tracking-wider">
            Company
          </h4>
          <Link href="/about" className="block font-semibold hover:underline">
            About Us
          </Link>
          <Link href="/mission" className="block font-semibold hover:underline">
            Mission Statement
          </Link>
          <Link href="/locations" className="block font-semibold hover:underline">
            Our Locations
          </Link>
        </div>

        {/* Help */}
        <div className="space-y-4">
          <h4 className="text-sm font-extrabold uppercase tracking-wider">
            Help
          </h4>
          <Link href="/faq" className="block font-semibold hover:underline">
            FAQ
          </Link>
          <Link href="/contact" className="block font-semibold hover:underline">
            Contact Us
          </Link>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h4 className="text-sm font-extrabold uppercase tracking-wider">
            Legal
          </h4>
          <Link href="/privacy" className="block font-semibold hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="block font-semibold hover:underline">
            Terms & Conditions
          </Link>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-yellow-400 text-black text-sm font-semibold text-center py-4 px-4">
        © {new Date().getFullYear()} Luxella Foods. All rights reserved. Prices are subject to change.
      </div>
    </footer>
  );
}
