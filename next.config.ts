import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ['typeorm'],
  output: "standalone",
};

export default nextConfig;
