// components/home/FeatureStrip.js
"use client";

export default function FeatureStrip() {
  const items = [
    { title: "Fast Delivery", desc: "To your doorstep within 5 hours*", icon: "🚚" },
    { title: "Fresh & Frozen", desc: "Quality food items you can trust", icon: "🥬" },
    { title: "Secure Payment", desc: "Stripe checkout for safe payments", icon: "🔒" },
    { title: "WhatsApp Support", desc: "Order help & updates available", icon: "💬" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 pb-2">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            <div className="text-2xl">{it.icon}</div>
            <p className="font-bold mt-2">{it.title}</p>
            <p className="text-sm text-gray-600 mt-1">{it.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-gray-500 mt-2">
        *Delivery timeframe depends on location and availability.
      </p>
    </section>
  );
}
