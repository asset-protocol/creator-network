'use client';

import { Tabs, TabsProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

export function StudioTabs() {
  const pathName = usePathname();
  const { push } = useRouter();
  const activeKey = pathName.split('/').pop();

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
