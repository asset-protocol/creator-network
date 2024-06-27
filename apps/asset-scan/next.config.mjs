/** @type {import('next').NextConfig} */
import * as path from "path"

const __dirname = path.resolve();

const rewrites = async () => {
  return [
    {
      source: "/api/graphql",
      destination: "http://3.87.189.32:3000/graphql",
    },
  ];
};

const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  transpilePackages: ['antd'],
  rewrites,
  images: {
    loader: "custom",
    unoptimized: true,
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
