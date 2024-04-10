import AssetsHubsInfo from '~/pages/dashboard/components/assetsHubsInfo';
import AssetsTotalCount from './components/assetsTotalCount';
import { useAssetHub } from '@repo/ui/asset';
import Typography from "antd/es/typography";

const { Title } = Typography;

const DashboardPage = () => {
  const { hubInfo } = useAssetHub();

  return (
    <div className='w-full h-68'>
      <h2 className="frc-between mb-4">
        <Title level={2}>控制面板</Title>
      </h2>
      {hubInfo?.id && <div className='w-full frc-between gap-4 bg-#dedede40 px-4 py-4 rounded-2'>
        <div className='flex-0'>
          <AssetsTotalCount id={hubInfo?.id}/>
        </div>
        <div className='flex-1'>
          <AssetsHubsInfo id={hubInfo?.id}/>
        </div>
      </div>}
    </div>
  )
}

export default DashboardPage