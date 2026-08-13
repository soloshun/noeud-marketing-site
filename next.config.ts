import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography is hotlinked from the Unsplash CDN, which is what the
    // Unsplash licence asks for — it keeps their view counts honest and
    // means we serve no rights-managed bytes ourselves.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
