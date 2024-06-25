import { AssetEditor } from "@/app/_components/assets/AssetEdtor";
import { fetchAssetByBizId } from "@/app/_creatornetwork";

export default async function Page({ params }: { params: { hub: string, assetId: string } }) {
  const asset = await fetchAssetByBizId(params.hub, params.assetId);
  return (
    <div className="max-w-[900px] mx-auto">
      <AssetEditor asset={asset}></AssetEditor>
    </div>
  );
}