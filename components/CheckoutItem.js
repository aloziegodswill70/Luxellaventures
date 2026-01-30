"use client";

import Image from "next/image";

export default function CheckoutItem({ item }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>

        <div>
          <p className="font-medium text-sm">{item.name}</p>
          <p className="text-xs text-gray-500">
            ₦{item.price.toLocaleString()} × {item.qty}
          </p>
        </div>
      </div>

      <p className="font-semibold text-sm">
        ₦{(item.price * item.qty).toLocaleString()}
      </p>
    </div>
  );
}
