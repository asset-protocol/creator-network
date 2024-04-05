import {
  AssetEditor,
  useAssetHub,
  useGetAssetById,
} from "@repo/ui/asset";
import { toBigInt } from "ethers";
import { useParams } from "react-router-dom";
import { useNavigateAssetHub } from "~/utils/route";

const AssetEditPage = () => {
  const { assetId } = useParams();
  const { hubInfo } = useAssetHub();
  const { asset } = useGetAssetById(toBigInt(assetId!), hubInfo?.id ?? "");

  const navigate = useNavigateAssetHub();

  const handleSubmited = (assetId: bigint) => {
    navigate(`/asset/${assetId}`, { replace: true });
  };

  if (!asset) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-[1080px] mx-auto">
      <AssetEditor asset={asset} onPublished={handleSubmited}></AssetEditor>
    </div>
  );
}

export default AssetEditPage