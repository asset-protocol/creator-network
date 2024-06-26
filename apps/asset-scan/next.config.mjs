/** @type {import('next').NextConfig} */
import * as path from "path"
const __dirname = path.resolve();
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.js",
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: "",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
