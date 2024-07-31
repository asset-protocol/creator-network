'use client';

import { Tabs, TabsProps } from 'antd';
import { StudioAssetList } from './StudioAssetList';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function StudioTabs() {
  const pathName = usePathname();
  const { push } = useRouter();
  const [activeKey, setActiveKey] = useState<string>();

  useEffect(() => {
    setActiveKey(pathName.split('/').pop());
  }, [pathName]);

  const items: TabsProps['items'] = [
    {
      key: 'assets',
      label: 'Assets',
    },
    {
      key: 'curations',
      label: 'Curations',
    },
  ];
  const handleChange = (key: string) => {
    push(key);
  };

  return (
    <Tabs items={items} activeKey={activeKey} onChange={handleChange}></Tabs>
  );
}
