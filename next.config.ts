import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/services/contract-recruitment",
        destination: "/services/permanent-recruitment",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
