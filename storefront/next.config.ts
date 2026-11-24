import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/hire/apply",
        destination: "/pilot",
        permanent: true,
      },
      {
        source: "/academy",
        destination: "/how-it-works",
        permanent: true,
      },
      {
        source: "/academy/apply",
        destination: "/pilot",
        permanent: true,
      },
      {
        source: "/portal/demo",
        destination: "/sample",
        permanent: true,
      },
      {
        source: "/credibility",
        destination: "/accuracy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
