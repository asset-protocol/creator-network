import { Avatar, Dropdown, Spin } from 'antd';
import { AntDesignOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd'
import { useEffect, useMemo, useState } from 'react';
import { Asset, useAssetHub, useGetAssetHubs } from '@repo/ui/asset';
type AssetHubsMenuType = Pick<Asset, 'id' | 'name'>

const AssetHubsMenu = () => {
  const { changeHub } = useAssetHub();

  const { data, loading } = useGetAssetHubs();


  const [selectedKeys, setSelectedKeys] = useState<string>()

  const items: MenuProps['items'] = useMemo(() => {
    if (data?.length) {
      return data.map((item: AssetHubsMenuType) => {
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
    changeHub?.(key)
  };

  const currentHubs = useMemo(() => {
    if (!selectedKeys) {
      return data?.[0]
    }
    return data?.find((item: AssetHubsMenuType) => {
      return item.id === selectedKeys
    })
  }, [data, selectedKeys])

  useEffect(() => {
    if (currentHubs) {
      changeHub?.(currentHubs.id);
    }
  }, [currentHubs, changeHub])

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
          {(!loading && data?.length && data?.length > 1) && <DownOutlined />}
        </div>
      </Dropdown>
    </div>
  )
}

export default AssetHubsMenu