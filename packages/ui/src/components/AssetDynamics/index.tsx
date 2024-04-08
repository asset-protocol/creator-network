import { useMemo } from "react";
import { useGetAssetDynamics } from "../../client/indexer/asset";
import { ItemUpdate } from "./ItemUpdate";
import { Asset } from "../../client/core";
import { Typography } from 'antd';

const { Title } = Typography;

type AssetDynamicsProps = {
  hub: string;
  assetId: bigint;
}

export function AssetDynamics (props: AssetDynamicsProps) {
  const { hub, assetId } = props

  const { loading, data } = useGetAssetDynamics(hub, assetId)

  const list = useMemo(() => {
    return data?.assetMetadataHistories || []
  }, [data])

  console.log('AssetDynamics data', data)

  const onClick = (asset: Asset) => {
    console.log('onClick asset', asset)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="my-4">
      <Title level={2}>AssetDynamics</Title>
      <div className="bg-#fefcfc rounded-1 pb-4">
        <div className="tr frc-between mb-4 py-4 font-500 bg-#dedede px-4 rounded-t-1">
          <div className="flex-1">Hash</div>
          <div className="flex-1">操作地址</div>
          <div className="flex-1">链</div>
          <div className="flex-1">修改时间</div>
          <div className="flex-1 frc-center">修改详情</div>
        </div>
        {
          list.map((item: any, index: number) => {
            return <ItemUpdate key={item.id} showV2Button={(index < list.length - 1)} asset={item.asset} onClick={onClick}/>
          })
        }
      </div>
    </div>
  );
}
