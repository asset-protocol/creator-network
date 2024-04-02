import AssetsHubsInfo from '~/pages/dashboard/components/assetsHubsInfo';
import { useAuth } from '~/context/auth';
import AssetsTotalCount from './components/assetsTotalCount';

const DashboardPage = () => {
  const { assetHubId } = useAuth();

  return (
    <div className='w-full h-68'>
      <div className='w-full frc-between gap-16'>
          <div className='flex-1 frc-between gap-8'>
          {assetHubId && <AssetsTotalCount id={assetHubId}/> }
            <div className='fcc-center w-30 bg-#fef4f4 rounded-full aspect-[1/1] whitespace-nowrap'>
              <span className='text-#333 text-base'>Collect 总数</span>
              <span className='font-bold text-2xl'>30</span>
            </div>
            <div className='fcc-center w-30 bg-#fef4f4 rounded-full aspect-[1/1] whitespace-nowrap'>
              <span className='text-#333 text-base'>总浏览量</span>
              <span className='font-bold text-2xl'>30</span>
            </div>
          </div>
          {assetHubId && <AssetsHubsInfo id={assetHubId}/>}
      </div>
    </div>
  )
}

export default DashboardPage