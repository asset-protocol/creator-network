import AssetsHubsInfo from '~/pages/dashboard/components/assetsHubsInfo';
import AssetsTotalCount from './components/assetsTotalCount';
import { useAssetHub } from '@repo/ui/asset';
import Typography from "antd/es/typography";
import { CreateHubModal } from '~/components/hub/CreateHub';
import { useState } from 'react';
import Button from 'antd/es/button';
import { PlusSquareOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DashboardPage = () => {
  const { hubInfo, changeHub } = useAssetHub();
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className='w-full h-full relative'>
      <h2 className="w-full mb-4">
        <div className="frc-between">
          <Title level={2}>控制面板</Title>
          <Button disabled={!hubInfo?.id} type="primary" icon={<PlusSquareOutlined />} onClick={() => setOpen(true)}>创建Hub</Button>
        </div>
      </h2>
      {hubInfo?.id && <div className='w-full frc-between gap-4 bg-#dedede40 px-4 py-4 rounded-2'>
        <div className='flex-0'>
          <AssetsTotalCount id={hubInfo?.id}/>
        </div>
        <div className='flex-1'>
          <AssetsHubsInfo id={hubInfo?.id}/>
        </div>
      </div>}
      <div className='absolute bottom-0 left-0 right-0'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#6525FF90" fillOpacity="1" d="M0,224L34.3,229.3C68.6,235,137,245,206,224C274.3,203,343,149,411,149.3C480,149,549,203,617,192C685.7,181,754,107,823,112C891.4,117,960,203,1029,197.3C1097.1,192,1166,96,1234,80C1302.9,64,1371,128,1406,160L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
        </svg>
      </div>
    </div>
    <CreateHubModal
        onCancel={() => setOpen(false)}
        open={open}
        onFinish={(hub) => {
          setOpen(false);
          changeHub(hub.hub);
        }}
      />
    </>
  )
}

export default DashboardPage