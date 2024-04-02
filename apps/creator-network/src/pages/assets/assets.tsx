import { useAuth } from "~/context/auth";
import { useGetHubAssets } from "~/hooks/asset";

const AssetsPage = () => {
  console.log('AssetsPage')
  const { assetHubId } = useAuth()
  const { data, loading } = useGetHubAssets({
    hub: assetHubId ?? "",
    first: 9999,
    fetchPolicy: "no-cache",
    orderBy: ["timestamp_DESC"],
  });

  console.log('data', data)
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>AssetsPage</div>
  )
}

export default AssetsPage