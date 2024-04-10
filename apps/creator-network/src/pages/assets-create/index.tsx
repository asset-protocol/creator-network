import { LeftOutlined } from "@ant-design/icons";
import { AssetEditor, TYPE_RICH_TEXT } from "@repo/ui/asset";
import Button from "antd/es/button";
import Typography from "antd/es/typography";
import { useNavigate } from "react-router-dom";
import { useNavigateAssetHub } from "~/utils/route";
const { Title } = Typography;

const AssetCreatePage = () => {
  const navigateHub = useNavigateAssetHub();
  const navigate = useNavigate();

  const handleSubmitted = (assetId: bigint) => {
    navigateHub(`/assets/${assetId}`, { replace: true });
  };
  return (
    <div className="max-w-[1080px] mx-auto">
      <div className="frc-start gap-4">
        <Button className="mb-3" icon={<LeftOutlined />} onClick={() => navigate(-1)}>返回</Button>
        <Title level={2}>资产创建</Title>
      </div>
      <AssetEditor
        onPublished={handleSubmitted}
        defaultType={TYPE_RICH_TEXT}
      ></AssetEditor>
    </div>
  );
}

export default AssetCreatePage