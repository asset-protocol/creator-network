import { useMemo, useState } from "react";
import { useGetAssetDynamics } from "../../client/indexer/asset";
import { ItemUpdate } from "./ItemUpdate";
import { Asset } from "../../client/core";
import { Skeleton, Typography } from 'antd';
import Modal from "antd/es/modal/Modal";
import { AssetContent } from "../AssetViewer/AssetContent";

const { Title } = Typography;

type AssetDynamicsProps = {
  hub: string;
  assetId: bigint;
}

export function AssetDynamics (props: AssetDynamicsProps) {
  const { hub, assetId } = props
  const [selectAsset, setSelectAsset] = useState<Asset | null>(null)
  const [open, setOpen] = useState(false)

  const { loading, data } = useGetAssetDynamics(hub, assetId)

  const list = useMemo(() => {
    return data?.assetMetadataHistories || []
  }, [data])

  const onClick = (val: any) => {
    setSelectAsset(val)
    setOpen(true)
  }

  if (loading) return <div><Skeleton /></div>

  return (
    <>
    <div className="my-4">
      <Title level={2}>资产动态-内容修改</Title>
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
            return <ItemUpdate
              key={item.id}
              showV2Button={(index < list.length - 1)}
              timestamp={item.metadata.timestamp}
              asset={item.asset}
              onClick={() => {
                onClick(list[list.length - 1].metadata)
              }}
              onClick2={() => {
                onClick(item.metadata)
              }}
              />
          })
        }
      </div>
    </div>
    <Modal
      open={open}
      destroyOnClose
      centered
      footer={null}
      title="Pulbish Asset"
      width={700}
      transitionName=""
      maskClosable={false}
      maskTransitionName=""
      onCancel={() => {
        setOpen(false)
        setSelectAsset(null)
      }}
      className="h-[max-content]"
      wrapClassName="backdrop-blur-md"
    >
      {selectAsset && <AssetContent asset={selectAsset}/>}
    </Modal>
    </>
  );
}
