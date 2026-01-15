import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Frozen Proteins",
    icon: "🍗",
    slug: "frozen-proteins",
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260287/whole_frozen_chicken_african_market1_mh6srd.webp",
    blur:
      "https://res.cloudinary.com/dut0fvswc/image/upload/e_blur:300,w_20/v1768260287/whole_frozen_chicken_african_market1_mh6srd.webp",
  },
  {
    label: "Peppers",
    icon: "🌶",
    slug: "peppers",
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260274/long_red_pepper_african_knqtni.avif",
    blur:
      "https://res.cloudinary.com/dut0fvswc/image/upload/e_blur:300,w_20/v1768260274/long_red_pepper_african_knqtni.avif",
  },
  {
    label: "Tubers",
    icon: "🍠",
    slug: "tubers",
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260300/yam_tubers_african_market1_v0ymys.webp",
    blur:
      "https://res.cloudinary.com/dut0fvswc/image/upload/e_blur:300,w_20/v1768260300/yam_tubers_african_market1_v0ymys.webp",
  },
  {
    label: "Grains",
    icon: "🌾",
    slug: "grains",
    image:
      "https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260265/dry-beans_mp8kma.jpg",
    blur:
      "https://res.cloudinary.com/dut0fvswc/image/upload/e_blur:300,w_20/v1768260265/dry-beans_mp8kma.jpg",
  },
];

export default function Categories() {
  return (
    <section className="px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="bg-white rounded-xl shadow-sm overflow-hidden
                       active:scale-95 transition"
          >
            {/* Image for tablet & desktop */}
            <div className="relative h-28 hidden md:block">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={cat.blur}
              />
            </div>

            {/* Icon-first mobile view */}
            <div className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-3xl md:hidden">{cat.icon}</div>
              <p className="mt-2 font-medium text-sm">{cat.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
