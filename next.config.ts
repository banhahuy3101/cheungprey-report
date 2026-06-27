import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactCompiler: true,
  allowedDevOrigins: ["172.16.96.169", "172.16.96.14", "localhost", "127.0.0.1"],
};

export default nextConfig;