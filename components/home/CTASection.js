// components/home/CTASection.js
"use client";

export default function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-24 pt-6">
      <div className="rounded-3xl bg-green-500 text-white p-6 sm:p-10">
        <h3 className="text-xl sm:text-3xl font-extrabold">
          Ready to shop? Fresh African groceries in the UK.
        </h3>
        <p className="text-white/80 mt-3 max-w-2xl">
          Add items to cart, enter delivery details, and pay securely with Stripe.
          Need help? WhatsApp support is available.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#products"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Browse Products
          </a>
          <a
            href="/checkout"
            className="border border-white/30 hover:border-white/50 px-6 py-3 rounded-xl font-semibold"
          >
            Checkout
          </a>
        </div>
      </div>
    </section>
  );
}
