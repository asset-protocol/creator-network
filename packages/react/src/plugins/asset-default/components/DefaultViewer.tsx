import { Asset } from "@creator-network/core";
import { AssetViewerHeader } from "../../../asset/components/AssetViewer";

export default function UnknownViewer({ value }: { value: Asset }) {
  return (
    <div className="mx-w-[1080px] mx-auto">
      <div>UnknownViewer{value.name}</div>
    </div>
  );
}