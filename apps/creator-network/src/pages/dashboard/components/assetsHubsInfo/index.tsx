import { useAssetHub } from "@repo/ui/asset";
import { useMemo } from "react";
import useAssetHubsById from "~/hooks/useAssetsHubById";

type AssetsHubsInfoProps = {
  id: string
}

const AssetsHubsInfo: React.FC<AssetsHubsInfoProps> = (props) => {
  const { id } = props;
  const { loading, error, data } = useAssetHubsById(id);
  const { hubInfo } = useAssetHub();
  console.log('hubInfo', hubInfo)
  
  const assetHub = useMemo(() => {
    return data?.assetHubById
  }, [data])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='flex-1 bg-#f2f5f8 rounded-1 h-auto text-left p-4'>
      <div><span className='text-#333 font-500 mr-2'>AssetHub Name:</span><span>{assetHub.name}</span></div>
      <div><span className='text-#333 font-500 mr-2'>AssetHub:</span><span>{assetHub.hash}</span></div>
      <div><span className='text-#333 font-500 mr-2'>AssetHub Admin:</span><span>{assetHub.admin}</span></div>
      <div><span className='text-#333 font-500 mr-2'>AssetHub Version:</span><span>{assetHub.version || '--'}</span></div>
      <div><span className='text-#333 font-500 mr-2'>AssetHub CreateTime:</span><span>{assetHub.timestamp}</span></div>
      <div><span className='text-#333 font-500 mr-2'>NftGatedModule:</span><span>{assetHub.nftGatedModule}</span></div>
    </div>
  )
}

export default AssetsHubsInfo