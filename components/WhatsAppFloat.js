"use client";

export default function WhatsAppFloat() {
  const whatsappNumber = "447000000000"; // replace with your real number
  const message = "Hello Luxella Ventures, I would like to make an enquiry.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-24 right-4 z-50 flex items-center justify-center
                 w-14 h-14 rounded-full bg-primary text-white text-3xl
                 shadow-lg active:scale-95 transition"
    >
      💬
    </a>
  );
}
