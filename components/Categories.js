import Image from "next/image";

const items = [
  { icon: "🍗", label: "Frozen Proteins", img: "protein.jpg" },
  { icon: "🌶", label: "Peppers", img: "pepper.jpg" },
  { icon: "🍠", label: "Tubers", img: "tubers.jpg" },
  { icon: "🌾", label: "Grains", img: "grains.jpg" },
];

export default function Categories() {
  return (
    <section className="container py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="relative h-32 hidden md:block">
            <Image
              src="https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260300/yam_tubers_african_market1_v0ymys.webp"
              alt="Fresh Yam Tubers"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="https://res.cloudinary.com/dut0fvswc/image/upload/e_blur:300,w_20/v1768260300/yam_tubers_african_market1_v0ymys.webp"
            />
          </div>

          <div className="p-4 text-center">
            <div className="text-3xl md:hidden">{item.icon}</div>
            <p className="mt-2 font-medium">{item.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
