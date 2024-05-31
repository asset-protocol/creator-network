'use client'

import { useGoAsset } from "@/app/[hub]/_navigate";
import { useGetAssetById } from "@creator-network/indexer-js";
import { AssetEditor } from "@creator-network/react/asset";
import { toBigInt } from "ethers";

export default function Page({ params }: { params: { hub: string, assetId: string } }) {
  const { asset } = useGetAssetById(toBigInt(params.assetId!), params.hub!);

  const { goViewer } = useGoAsset();

  const handleSubmited = (hub: string, assetId: bigint) => {
    goViewer(hub, assetId.toString());
  };

  if (!asset) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-[900px] mx-auto">
      <AssetEditor asset={asset} onPublished={handleSubmited}></AssetEditor>
    </div>
  );
}