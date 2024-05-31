import { Asset, replaceUri } from "@creator-network/core";

export default function ImageViewer({ value }: { value: Asset }) {
  const images = value.content ?? "[]";
  const files = JSON.parse(images) as string[];

  return (
    <div className="max-w-[1080px] mx-auto">
      <div className="text-[0]">
        {files.map((f, i) => (
          <img width="100%" title={f} src={replaceUri(f)} key={f + i} />
        ))}
      </div>
    </div>
  );
}
