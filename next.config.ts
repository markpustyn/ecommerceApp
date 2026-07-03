import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.houseofblanks.com',
      },
    ],
  },
};

export default nextConfig;
