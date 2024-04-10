import { Skeleton, Typography } from "antd";
import { useMemo } from "react";
import useAssetHubsById from "~/hooks/useAssetsHubById";
const { Text } = Typography;

type AssetsHubsInfoProps = {
  id: string
}

const AssetsHubsInfo: React.FC<AssetsHubsInfoProps> = (props) => {
  const { id } = props;
  const { loading, error, data } = useAssetHubsById(id);
  
  const assetHub = useMemo(() => {
    return data?.assetHubById
  }, [data])

  if (loading) return <div className='w-full flex-2 bg-#6525FF0A rounded-1 h-auto text-left p-4'><Skeleton /></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='w-full flex-1 bg-#6525FF0A rounded-1 h-auto text-left p-4'>
      <div className="frc-start gap-2">
        <Text >AssetHub Name:</Text>
        <Text type="secondary" strong italic>{assetHub.name}</Text>
      </div>
      <div className="frc-start gap-2">
        <Text >AssetHub Hash:</Text>
        <Text type="secondary" strong italic>{assetHub.hash}</Text>
      </div>
      <div className="frc-start gap-2">
        <Text >AssetHub Admin:</Text>
        <Text type="secondary" strong italic>{assetHub.admin}</Text>
      </div>
      <div className="frc-start gap-2">
        <Text >AssetHub Version:</Text>
        <Text type="secondary" strong italic>{assetHub.version || '--'}</Text>
      </div>
      <div className="frc-start gap-2">
        <Text >AssetHub CreateTime:</Text>
        <Text type="secondary" strong italic>{assetHub.timestamp ? new Date(Number.parseInt(assetHub.timestamp.toString())).toString() : '--'}</Text>
      </div>
      <div className="frc-start gap-2">
        <Text >NftGatedModule:</Text>
        <Text type="secondary" strong italic>{assetHub.nftGatedModule}</Text>
      </div>
    </div>
  )
}

export default AssetsHubsInfo