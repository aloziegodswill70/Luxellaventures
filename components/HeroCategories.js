import Image from "next/image";

const categories = [
  {
    name: "Frozen",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/v1768260267/large_croaker_fish_frozen_rubf44.webp",
  },
  {
    name: "Peppers",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260300/yam1_wlyvtp.jpg", // reused temporarily
  },
  {
    name: "Tubers",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260300/yam_tubers_african_market1_v0ymys.webp",
  },
  {
    name: "Grains",
    img: "https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260300/yam1_wlyvtp.jpg", // reused temporarily
  },
];

export default function HeroCategories() {
  return (
    <section className="py-4">
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="min-w-[45%] sm:min-w-[30%] bg-white rounded-xl shadow-sm"
          >
            <div className="relative h-24">
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover rounded-t-xl"
                sizes="(max-width: 640px) 50vw, 25vw"
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
