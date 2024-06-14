import { AssetEditor } from "@/app/_components/assets/AssetEdtor";
import { fetchAssetById } from "@/app/_creatornetwork";

export default async function Page({ params }: { params: { hub: string, assetId: string } }) {
  const asset = await fetchAssetById(params.hub, params.assetId);
  return (
    <div className="max-w-[900px] mx-auto">
      <AssetEditor asset={asset}></AssetEditor>
    </div>
  );
}