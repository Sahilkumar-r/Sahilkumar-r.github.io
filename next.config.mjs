import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: base,
  assetPrefix: base || undefined,
  webpack(config) {
    config.resolve.alias["@"] = path.join(root, "src");
    return config;
  },
};
export default nextConfig;
