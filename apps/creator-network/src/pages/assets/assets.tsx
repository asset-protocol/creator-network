import { Asset, AssetList, useAssetHub } from "@repo/ui/asset";
import { useAuth } from "~/context/auth";

const AssetsPage = () => {
  const { hubInfo } = useAssetHub();
  const { assetHubId } = useAuth();
  console.log('AssetsPage, hubInfo', hubInfo)

  const hanldeClickAsset = (asset: Asset) => {
    console.log('asset', asset)
    // navigateHub("asset/" + asset.assetId.toString());
  };
  
  return (
    <div className="w-full h-full">
      <h1>资产管理</h1>
      {assetHubId && <AssetList
        hub={assetHubId}
        grid={{ column: 4, gutter: 12, xs: 2, sm: 3 }}
        onAssetClick={hanldeClickAsset}
      ></AssetList>}
    </div>
  )
}

export default AssetsPage