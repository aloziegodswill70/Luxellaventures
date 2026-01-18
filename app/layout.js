import "./globals.css";

import { CartProvider } from "../context/CartContext";

import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CartDrawer from "@/components/CartDrawer";

/** =========================
 *  GLOBAL SEO & META CONFIG
 *  ========================= */
export const metadata = {
  metadataBase: new URL("https://www.luxellaventures.com"),

  title: {
    default: "Luxella Ventures | African Food & Grocery Store",
    template: "%s | Luxella Ventures",
  },

  description:
    "Luxella Ventures is a trusted African food and grocery store offering frozen proteins, peppers, tubers, grains and more. Quality food, reliable delivery.",

  keywords: [
    "African food store",
    "buy African food online",
    "Nigerian food store",
    "African groceries",
    "frozen African food",
    "yam",
    "plantain",
    "ponmo",
    "shaki",
    "goat meat",
    "African food UK",
  ],

  authors: [{ name: "Luxella Ventures" }],
  creator: "Luxella Ventures",

  openGraph: {
    title: "Luxella Ventures | African Food & Grocery Store",
    description:
      "Shop quality African food items including frozen proteins, tubers, peppers, and grains.",
    url: "https://www.luxellaventures.com",
    siteName: "Luxella Ventures",
    images: [
      {
        url: "/images/luxellalogo.jpeg",
        width: 800,
        height: 800,
        alt: "Luxella Ventures Logo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxella Ventures | African Food Store",
    description:
      "Fresh African food products delivered with care. Shop frozen proteins, tubers, peppers & grains.",
    images: ["/luxellalogo.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/luxellalogo.jpeg",
    apple: "/luxellalogo.jpeg",
  },

  category: "Ecommerce",
};

/** =========================
 *  VIEWPORT CONFIG
 *  ========================= */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#138A36",
};

/** =========================
 *  ROOT LAYOUT
 *  ========================= */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-surface text-dark">
        <CartProvider>
          {children}

          {/* 🔥 Global Cart Drawer */}
          <CartDrawer />

          {/* Global UI Elements */}
          <BottomNav />
          <WhatsAppFloat />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
