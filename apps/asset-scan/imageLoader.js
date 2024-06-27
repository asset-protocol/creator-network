export default function ({ src, width, height }) {
  if (src.startsWith("https://arweave.net")) {
    return "/api/image?url=" + src + "&width=" + width + "&height=" + height;
  }
  return src;
}
