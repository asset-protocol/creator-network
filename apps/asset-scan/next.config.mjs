/** @type {import('next').NextConfig} */
const nextConfig = {
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
