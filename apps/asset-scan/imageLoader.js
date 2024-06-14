export default function ({ src }) {
  if (src.startsWith("https://arweave.net")) {
    return "/api/image?url=" + src;
  }
  return src;
}
