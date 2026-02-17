
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-black mt-20">
      <div className="container mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <p className="mt-4 text-sm font-medium">
            African food supply you can trust.
          </p>
        </div>

        {/* Company */}
        <div className="text-sm space-y-3">
          <h4 className="font-semibold uppercase">Company</h4>
          <Link href="/about" className="block hover:underline">About Us</Link>
          <Link href="/mission" className="block hover:underline">Mission Statement</Link>
          <Link href="/locations" className="block hover:underline">Our Locations</Link>
        </div>

        {/* Help */}
        <div className="text-sm space-y-3">
          <h4 className="font-semibold uppercase">Help</h4>
          <Link href="/faq" className="block hover:underline">FAQ</Link>
          <Link href="/contact" className="block hover:underline">Contact Us</Link>
        </div>

        {/* Legal */}
        <div className="text-sm space-y-3">
          <h4 className="font-semibold uppercase">Legal</h4>
          <Link href="/privacy" className="block hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="block hover:underline">Terms & Conditions</Link>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-yellow-400 text-black text-xs text-center py-4">
        © {new Date().getFullYear()} Luxella Foods. Prices are subject to change.
      </div>
    </footer>
  );
}
