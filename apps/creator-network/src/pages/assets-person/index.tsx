/**
 * 个人资产管理页面
 */
import { PlusSquareOutlined } from "@ant-design/icons";
import { Asset, useAssetHub, useGetAssetsByWallet } from "@repo/ui/asset";
import Button from "antd/es/button";
import { useNavigate } from "react-router-dom";
import { useNavigateAssetHub } from "~/utils/route";
import Typography from "antd/es/typography";
import List from "antd/es/list";
import { useAccount } from "wagmi";
import { AssetItem } from "../../../../../packages/ui/src/components/AssetList/AssetItem";

const { Title } = Typography;

const AssetsPersonPage = () => {
  const { hubInfo } = useAssetHub();
  const navigateHub = useNavigateAssetHub();
  const navigate = useNavigate();
  const currentAccount = useAccount();

  const { data, loading } = useGetAssetsByWallet(currentAccount?.address!, hubInfo?.id!);

  const hanldeClickAsset = (asset: Asset) => {
    navigateHub("assets/" + asset.assetId.toString());
  };
  
  return (
    <div className="w-full h-full">
      <h2 className="frc-between mb-4">
        <div>
        <Title level={2}>个人资产管理</Title>
        <Button disabled={!hubInfo?.id} type="primary" icon={<PlusSquareOutlined />} onClick={() => navigate(`/assets/create`)}>创建资产</Button>
        </div>
      </h2>
      <List
        // pagination={{ position: "bottom", align: "center" }}
        grid={{ column: 4, gutter: 12, xs: 2, sm: 3 }}
        loading={loading}
        dataSource={data?.assets}
        itemLayout="horizontal"
        rowKey={(item) => item.assetId}
        renderItem={(item) => (
          <List.Item
            colStyle={{ display: "flex", height: "100%" }}
            className="w-full"
          >
            <AssetItem
              value={item}
              key={item.assetId}
              onClick={hanldeClickAsset}
            />
          </List.Item>
        )}
      ></List>
    </div>
  )
}

export default AssetsPersonPage