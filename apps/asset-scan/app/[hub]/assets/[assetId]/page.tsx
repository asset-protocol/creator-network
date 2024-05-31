import { AssetViewer, AssetViewerProps } from "@creator-network/react/asset";
import { redirectAssetEdit } from "../../_redirect";
import { fetchAssetById } from "@creator-network/indexer-js";

export default async function AssetViewPage({ params }: { params: { hub: string, assetId: string } }) {
  const { hub, assetId } = params;

  const asset = await fetchAssetById(hub, assetId);
  const config: AssetViewerProps | undefined = hub
    ? {
      hub,
      asset,
      onEdit: () => {
        if (assetId) {
          redirectAssetEdit(hub, assetId);
        }
      },
    }
    : undefined;

  return (
    <div className="flex flex-col m-auto">
      {assetId !== "" ? (
        <div className="max-w-[900px] mt-8 mx-auto">
          {asset.name}
          {config && <AssetViewer {...config} />}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
