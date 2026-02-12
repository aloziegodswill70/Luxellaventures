// components/home/PromoBanners.js
"use client";

export default function PromoBanners() {
  const promos = [
    {
      title: "Best African Food Items in the UK",
      desc: "Shop the essentials for your soups, stews, and swallow.",
      badge: "Top Picks",
    },
    {
      title: "Fresh Vegetables & Spices",
      desc: "Cook like home — authentic taste, fast delivery.",
      badge: "Fresh",
    },
    {
      title: "Fish & Meats",
      desc: "Stock your freezer with quality items for the week.",
      badge: "Protein",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-4">
      <div className="grid md:grid-cols-3 gap-3">
        {promos.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border bg-white p-5 shadow-sm relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-orange-100" />
            <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-green-100" />

            <div className="relative">
              <span className="inline-block text-xs font-semibold bg-black text-white px-3 py-1 rounded-full">
                {p.badge}
              </span>
              <h3 className="mt-3 font-extrabold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
