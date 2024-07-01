import { PlusSquareOutlined } from "@ant-design/icons";
import { Asset, AssetList, useAssetHub } from "@repo/ui/asset";
import Button from "antd/es/button";
import { useNavigate } from "react-router-dom";
import { useNavigateAssetHub } from "~/utils/route";
import Typography from "antd/es/typography";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useMemo, useState } from "react";
import AssetsTags from "~/components/assetsTags";

const { Title } = Typography;

const AssetsPage = () => {
  const { hubInfo } = useAssetHub();
  console.log('AssetsPage ---- hubInfo', hubInfo)
  const navigateHub = useNavigateAssetHub();
  const navigate = useNavigate();
  const account = useAccount()
  const { openConnectModal } = useConnectModal();
  const [selectedTags, setSelectTags] = useState<string[]>([]);

  const hubId = useMemo(() => {
    return hubInfo?.id ?? ''
  }, [hubInfo?.id])

  const hanldeClickAsset = (asset: Asset) => {
    navigateHub("assets/" + asset.assetId.toString());
  };

  const onClick = () => {
    if (!account?.address) {
      openConnectModal?.()
      return
    }
    navigate(`/assets/create`)
  }

  console.log('hubId', hubId)
  
  return (
    <div className="w-full h-full">
      <h2 className="mb-4">
        <div className="frc-between">
        <Title level={2}>资产管理</Title>
        <Button disabled={!hubInfo?.id} type="primary" icon={<PlusSquareOutlined />} onClick={onClick}>创建资产</Button>
        </div>
      </h2>
      {hubId && <>
        <AssetsTags onChange={setSelectTags}/>
        <AssetList
        query={{
          hub: hubId,
          first: 9999,
          tags: selectedTags.map((t) => t.toLowerCase()),
          fetchPolicy: "no-cache",
          orderBy: ["timestamp_DESC"],
          skipFunc: (args) => !args.hub,
        }}
        grid={{ column: 4, gutter: 12, xs: 2, sm: 3 }}
        onAssetClick={hanldeClickAsset}
      ></AssetList>
      </>}
    </div>
  )
}

export default AssetsPage