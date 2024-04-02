import useAssetsTotalCount from "~/hooks/useAssetsTotalCount";

type AssetsTotalCountProps = {
  id: string
}

const AssetsTotalCount: React.FC<AssetsTotalCountProps> = (props) => {
  const { id } = props;
  const { loading, error, data } = useAssetsTotalCount(id);

  if (loading) return <div>loading...</div>

  if (error) return <div>error</div>

  return (
    <div className='fcc-center w-30 bg-#fef4f4 rounded-full aspect-[1/1] whitespace-nowrap'>
      <span className='text-#333 text-base'>资产总数</span>
      <span className='font-bold text-2xl'>{data?.assetsConnection?.totalCount || 0}</span>
    </div>
  )
}

export default AssetsTotalCount