import Image from "next/image";

const categories = [
  { name: "Frozen", img: "/placeholder.jpg" },
  { name: "Peppers", img: "/placeholder.jpg" },
  { name: "Tubers", img: "/placeholder.jpg" },
  { name: "Grains", img: "/placeholder.jpg" },
];

export default function HeroCategories() {
  return (
    <section className="py-4">
      <div className="flex gap-3 overflow-x-auto px-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="min-w-[30%] bg-white rounded-xl shadow-sm"
          >
            <div className="relative h-24">
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover rounded-t-xl"
              />
            </div>
            <p className="text-center text-sm font-medium py-2">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
