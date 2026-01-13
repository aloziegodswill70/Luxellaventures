import Image from "next/image";

export default function Hero() {
  return (
    <section className="container pt-24 grid md:grid-cols-2 gap-10 items-center">

      {/* Text + Icons */}
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Fresh African Food Delivered
        </h1>

        <p className="mt-4 text-gray-600">
          Quality frozen foods, peppers & tubers
        </p>

        <div className="flex gap-6 text-3xl mt-6 md:hidden">
          <span>🍗</span>
          <span>🌶</span>
          <span>🍠</span>
          <span>🌾</span>
        </div>

        <button className="mt-8 bg-secondary text-white px-8 py-3 rounded-lg">
          🛒 Shop Now
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative h-72 md:h-96">
          <Image
                src="https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260300/yam_tubers_african_market1_v0ymys.webp"
                 alt="Fresh Yam Tubers"
                  fill
                  className="object-cover"
                 placeholder="blur"
                blurDataURL="https://res.cloudinary.com/dut0fvswc/image/upload/e_blur:300,w_20/v1768260300/yam_tubers_african_market1_v0ymys.webp"
             />
      </div>

    </section>
  );
}
