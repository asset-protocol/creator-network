import { LeftOutlined } from "@ant-design/icons";
import { AssetEditor, TYPE_RICH_TEXT } from "@repo/ui/asset";
import Button from "antd/es/button";
import { useNavigate } from "react-router-dom";
import { useNavigateAssetHub } from "~/utils/route";

const AssetCreatePage = () => {
  const navigateHub = useNavigateAssetHub();
  const navigate = useNavigate();

  const handleSubmitted = (assetId: bigint) => {
    navigateHub(`/assets/${assetId}`, { replace: true });
  };
  return (
    <div className="max-w-[1080px] mx-auto">
      <h2>
        <Button icon={<LeftOutlined />} onClick={() => navigate(-1)}>返回</Button>
      </h2>
      <AssetEditor
        onPublished={handleSubmitted}
        defaultType={TYPE_RICH_TEXT}
      ></AssetEditor>
    </div>
  );
}

export default AssetCreatePage