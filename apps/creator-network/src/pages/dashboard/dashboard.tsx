import AssetsHubsInfo from '~/pages/dashboard/components/assetsHubsInfo';
import AssetsTotalCount from './components/assetsTotalCount';
import { useAssetHub } from '@repo/ui/asset';

const DashboardPage = () => {
  const { hubInfo } = useAssetHub();

  return (
    <div className='w-full h-68'>
      <div className='w-full frc-between gap-16'>
          <div className='flex-1 frc-center gap-8'>
            {hubInfo?.id && <AssetsTotalCount id={hubInfo?.id}/> }
            {/* <div className='fcc-center w-30 bg-#fef4f4 rounded-full aspect-[1/1] whitespace-nowrap'>
              <span className='text-#333 text-base'>Collect 总数</span>
              <span className='font-bold text-2xl'>30</span>
            </div>
            <div className='fcc-center w-30 bg-#fef4f4 rounded-full aspect-[1/1] whitespace-nowrap'>
              <span className='text-#333 text-base'>总浏览量</span>
              <span className='font-bold text-2xl'>30</span>
            </div> */}
          </div>
          {hubInfo?.id && <AssetsHubsInfo id={hubInfo?.id}/>}
      </div>
    </div>
  )
}

export default DashboardPage