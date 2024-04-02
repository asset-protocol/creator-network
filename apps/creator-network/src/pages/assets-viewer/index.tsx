import { AssetViewer, AssetViewerProps } from "@repo/ui/asset";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useNavigateAssetHub } from "~/utils/route";
import { useAuth } from "~/context/auth";
import Button from "antd/es/button";
import { LeftOutlined } from "@ant-design/icons";

const AssetViewerPage = () => {
  const { assetId } = useParams();
  // TODO need params replace
  const { assetHubId } = useAuth();
  console.log('assetId', assetId)
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();

  const resAssetId = assetId && BigInt(assetId);
  console.log('resAssetId', resAssetId)

  const config: Omit<AssetViewerProps, "assetId"> = {
    account: address,
    requestLogin: openConnectModal,
    onEdit: () => {
      navigate(`/assets/${assetId}/edit`);
    },
  };

  return (
    <div className="flex flex-col m-auto">
      <h2><Button icon={<LeftOutlined />} onClick={() => navigate(-1)}>返回</Button></h2>
      {resAssetId ? (
        <div className="mt-8">
          <AssetViewer assetId={resAssetId} hubId={assetHubId} {...config} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default AssetViewerPage