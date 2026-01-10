import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      // Allow any other common domains if needed, or stick to strict
    ],
  },
};

export default nextConfig;
