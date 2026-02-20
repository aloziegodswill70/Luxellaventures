// components/WhatsAppFloat.js
"use client";

export default function WhatsAppFloat() {
  const whatsappNumber = "+447344447897"; // replace with real number
  const message =
    "Hello Luxella Ventures, I would like to make an enquiry.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed
        bottom-[90px]    /* sits above 64px bottom nav */
        right-4
        z-[9999]         /* above navbar & bottomnav */
        w-14 h-14
        flex items-center justify-center
        rounded-full
        bg-[#25D366]
        shadow-2xl
        active:scale-95
        transition
      "
    >
      {/* WhatsApp SVG icon instead of emoji */}
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 fill-white"
      >
        <path d="M20.52 3.48A11.91 11.91 0 0012.01 0C5.38 0 .02 5.36.02 12c0 2.11.55 4.17 1.6 5.98L0 24l6.22-1.63A11.94 11.94 0 0012 24c6.63 0 11.99-5.36 11.99-12 0-3.2-1.25-6.21-3.47-8.52zM12 21.82c-1.88 0-3.73-.5-5.34-1.45l-.38-.23-3.69.97.99-3.6-.25-.37A9.82 9.82 0 012.18 12c0-5.42 4.4-9.82 9.82-9.82 2.62 0 5.08 1.02 6.93 2.88a9.75 9.75 0 012.89 6.94c0 5.42-4.4 9.82-9.82 9.82zm5.48-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48 0 1.45 1.08 2.85 1.23 3.05.15.2 2.13 3.25 5.16 4.55.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
