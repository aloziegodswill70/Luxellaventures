import Image from "next/image";

export default function ProductCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      
      {/* Image (Desktop) */}
      <div className="relative h-36 hidden md:block">
            <Image
                src="https://res.cloudinary.com/dut0fvswc/image/upload/f_auto,q_auto,w_800,c_fill/v1768260300/yam_tubers_african_market1_v0ymys.webp"
                alt="Fresh Yam Tubers"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="https://res.cloudinary.com/dut0fvswc/image/upload/e_blur:300,w_20/v1768260300/yam_tubers_african_market1_v0ymys.webp"
            />
      </div>

      {/* Icon (Mobile) */}
      <div className="text-4xl md:hidden text-center">🍗</div>

      <h3 className="mt-3 font-semibold">Product Name</h3>

      <p className="text-sm text-gray-500">₦0.00</p>

      <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg">
        ➕ Add to Cart
      </button>
    </div>
  );
}
