import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container py-12 grid gap-8 md:grid-cols-3">

        <div>
          <Image
            src="/images/luxellalogo.jpeg"
            alt="LuxellaFoods"
            width={50}
            height={50}
          />
          <p className="mt-3 text-sm">
            African food supply you can trust.
          </p>
        </div>

        <div className="text-sm space-y-2">
          <p>📦 Categories</p>
          <p>🚚 Delivery</p>
          <p>📄 Policies</p>
        </div>

        <div className="text-sm">
          📞 Contact Us
        </div>

      </div>

      <div className="bg-dark text-xs text-center py-3">
        Prices are susceptible to change.
      </div>
    </footer>
  );
}
