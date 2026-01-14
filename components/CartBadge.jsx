"use client";

export default function CartBadge({ count }) {
  if (!count || count < 1) return null;

  return (
    <span
      className="absolute -top-1 -right-2
                 min-w-[18px] h-[18px]
                 px-1
                 flex items-center justify-center
                 rounded-full
                 bg-red-600 text-white
                 text-[11px] font-bold
                 leading-none"
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}
