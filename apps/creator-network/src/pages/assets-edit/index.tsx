import {
  AssetEditor,
  useAssetHub,
  useGetAssetById,
} from "@repo/ui/asset";
import { toBigInt } from "ethers";
import { useNavigate, useParams } from "react-router-dom";
import { useNavigateAssetHub } from "~/utils/route";
import Typography from "antd/es/typography";
import { LeftOutlined } from "@ant-design/icons";
import Button from "antd/es/button";

const { Title } = Typography;

const AssetEditPage = () => {
  const { assetId } = useParams();
  const { hubInfo } = useAssetHub();
  const { asset } = useGetAssetById(toBigInt(assetId!), hubInfo?.id ?? "");

  const navigateHub = useNavigateAssetHub();
  const navigate = useNavigate();

  const handleSubmited = (assetId: bigint) => {
    navigateHub(`/assets/${assetId}`, { replace: true });
  };

  if (!asset) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-[1080px] mx-auto">
      <div className="frc-start gap-4">
        <Button className="mb-3" icon={<LeftOutlined />} onClick={() => navigate(-1)}>返回</Button>
        <Title level={2}>资产编辑</Title>
      </div>
      <AssetEditor asset={asset} onPublished={handleSubmited}></AssetEditor>
    </div>
  );
}

export default AssetEditPage
