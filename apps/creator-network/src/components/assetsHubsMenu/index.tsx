import { Avatar, Dropdown, Spin } from 'antd';
import { AntDesignOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd'
import { useEffect, useMemo, useState } from 'react';
import useAssetHubs from '~/hooks/useAssetsHub';
import { useAuth } from '~/context/auth';


const AssetHubsMenu = () => {
  const { loading, data } = useAssetHubs()
  const { setAssetHubId } = useAuth()

  console.log('data', data)

  const [selectedKeys, setSelectedKeys] = useState<string>()

  const items: MenuProps['items'] = useMemo(() => {
    if (data?.assetHubs?.length) {
      return data.assetHubs.map((item: AssetHubsMenu) => {
        return {
          label: item.name,
          key: item.id,
        }
      })
    }
    return []
  }, [data])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setSelectedKeys(key)
    setAssetHubId(key)
  };

  const currentHubs = useMemo(() => {
    if (!selectedKeys) {
      return data?.assetHubs?.[0]
    }
    return data?.assetHubs?.find((item: AssetHubsMenu) => {
      return item.name === selectedKeys
    })
  }, [data, selectedKeys])

  useEffect(() => {
    if (currentHubs) {
      setAssetHubId(currentHubs.id)
    }
  }, [currentHubs, setAssetHubId])

  return (
    <div className="fcc-center py-4 mb-2" >
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        icon={<AntDesignOutlined />}
        className='bg-blue'
      />
      <Dropdown menu={{ items, onClick }}>
        <div className='font-bold text-white mt-4 cursor-pointer'>
          {loading ? <Spin />
          : currentHubs?.name || '--'}
          {(!loading && data?.assetHubs?.length > 1) && <DownOutlined />}
        </div>
      </Dropdown>
    </div>
  )
}

export default AssetHubsMenu