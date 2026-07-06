import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/jobseekers",
        destination: "/job-seekers",
        permanent: true,
      },
      {
        source: "/jobs/vehicle-technician-mot-plymouth",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/jobs/vehicle-technician-mot-exeter",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/jobs/vehicle-technician-mot-st-austell",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/jobs/vehicle-technician-mot-truro",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/services/temporary-recruitment",
        destination: "/employers",
        permanent: true,
      },
      {
        source: "/services/contract-recruitment",
        destination: "/services/permanent-recruitment",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
