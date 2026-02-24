"use client";

import { useEffect, useState } from "react";

export default function SwanseaNoticeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("SwanseaNoticeSeen");

    if (!hasSeen) {
      setOpen(true);
      sessionStorage.setItem("SwanseaNoticeSeen", "true");
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl text-center relative animate-fadeIn">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          🚚 Delivery Notice
        </h2>

        <p className="text-gray-600 text-sm sm:text-base">
          Deliveries are currently available within <strong>Swansea only</strong>.
          Orders outside Swansea will not be processed.
        </p>

        <button
          onClick={() => setOpen(false)}
          className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm transition"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}