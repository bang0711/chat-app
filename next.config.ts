import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  devIndicators: false,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "**",
        pathname: "**",
        protocol: "https",
      },
      {
        hostname: "**",
        pathname: "**",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
