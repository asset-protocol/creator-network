import { fetchAssets } from "@/app/_creatornetwork"
import { RecentlyAssetItem } from "./RecentlyAssetItem"

export async function RecentlyAssets() {
  const assets = await fetchAssets({
    orderBy: ["timestamp_DESC"],
    fetchPolicy: "no-cache"
  })

  return <div className="grid grid-cols-2 gap-4">
    {assets.assets.map(a => {
      return <RecentlyAssetItem asset={a} />
    })}
  </div>
}

