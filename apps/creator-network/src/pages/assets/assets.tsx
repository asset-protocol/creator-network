import { PlusSquareOutlined } from "@ant-design/icons";
import { Asset, AssetList, useAssetHub } from "@repo/ui/asset";
import Button from "antd/es/button";
import { useNavigate } from "react-router-dom";
import { useNavigateAssetHub } from "~/utils/route";
import Typography from "antd/es/typography";

const { Title } = Typography;

const AssetsPage = () => {
  const { hubInfo } = useAssetHub();
  const navigateHub = useNavigateAssetHub();
  const navigate = useNavigate();

  const hanldeClickAsset = (asset: Asset) => {
    navigateHub("assets/" + asset.assetId.toString());
  };
  
  return (
    <div className="w-full h-full">
      <h2 className="frc-between mb-4">
        <Title level={2}>资产管理</Title>
        <Button disabled={!hubInfo?.id} type="primary" icon={<PlusSquareOutlined />} onClick={() => navigate(`/assets/create`)}>创建资产</Button>
      </h2>
      {hubInfo?.id && <AssetList
        hub={hubInfo?.id}
        grid={{ column: 4, gutter: 12, xs: 2, sm: 3 }}
        onAssetClick={hanldeClickAsset}
      ></AssetList>}
    </div>
  )
}

export default AssetsPage