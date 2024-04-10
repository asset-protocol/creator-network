import { AssetViewer, AssetViewerProps, useAssetHub, AssetDynamics } from "@repo/ui/asset";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Button from "antd/es/button";
import { LeftOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography";

const { Title } = Typography;

const AssetViewerPage = () => {
  const { assetId } = useParams();
  const { address } = useAccount();
  const { hubInfo } = useAssetHub();
  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();

  const resAssetId = assetId && BigInt(assetId);

  const config: Omit<AssetViewerProps, "assetId"> = {
    account: address,
    requestLogin: openConnectModal,
    onEdit: () => {
      navigate(`/assets/${assetId}/edit`);
    },
  };

  return (
    <div className="flex flex-col m-auto">
      <div className="frc-start gap-4">
        <Button className="mb-3" icon={<LeftOutlined />} onClick={() => navigate(-1)}>返回</Button>
        <Title level={2}>资产详情</Title>
      </div>
      {resAssetId ? (
        <div className="mt-8">
          <AssetViewer assetId={resAssetId} {...config} />
          <div>
            {hubInfo?.id && <AssetDynamics hub={hubInfo.id} assetId={resAssetId}/>}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default AssetViewerPage