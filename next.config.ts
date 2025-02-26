import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "example.com",
      "external-content.duckduckgo.com",
      "avatar.iran.liara.run",
    ],
  },
};

module.exports = nextConfig;
