/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],

    // ✅ Stop timeouts locally (Vercel/production still optimizes)
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
