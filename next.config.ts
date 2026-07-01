import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactCompiler: true,
  allowedDevOrigins: ["172.16.96.169", "172.16.96.14", "localhost", "127.0.0.1"],
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingIncludes: {
    "/dashboard/commune-evaluation/[id]/pdf": [
      "./src/features/commune-evaluation/assets/Siemreap-Regular.ttf",
      "./public/fonts/Siemreap-Regular.ttf",
    ],
  },
};

export default nextConfig;