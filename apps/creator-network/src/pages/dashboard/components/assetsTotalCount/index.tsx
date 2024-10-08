import Spin from "antd/es/spin";
import useAssetsTotalCount from "~/hooks/useAssetsTotalCount";

type AssetsTotalCountProps = {
  id: string
}

const AssetsTotalCount: React.FC<AssetsTotalCountProps> = (props) => {
  const { id } = props;
  const { loading, error, data } = useAssetsTotalCount(id);

  if (error) return <div>error</div>

  return (
    <div className='fcc-center w-30 bg-#6525FF0A rounded-full aspect-[1/1] whitespace-nowrap'>
      <span className='text-#333 text-base'>资产总数</span>
      <span className='font-bold text-2xl text-#6525ff'>{loading ? <Spin /> : data?.assetsConnection?.totalCount || 0}</span>
    </div>
  )
}

export default AssetsTotalCount