'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, MenuProps } from 'antd';
import { InfoIcon, Package2 } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
type MenuItem = Required<MenuProps>['items'][number];

export function CurationTabs({ curationId }: { curationId: string }) {
  const pathName = usePathname();
  const activeKey = pathName.split('/').pop();
  console.log('activeKey', activeKey);
  const menus: MenuItem[] = [
    {
      key: 'detail',
      label: (
        <Link href={`/creator/curation/${curationId}/edit/detail`}>Detail</Link>
      ),
      icon: <InfoIcon size={18} />,
      className: 'flex items-center',
    },
    {
      key: 'assets',
      label: (
        <Link href={`/creator/curation/${curationId}/edit/assets`}>Assets</Link>
      ),
      icon: <Package2 size={18} />,
      className: 'flex items-center',
    },
  ];
  return <Menu items={menus} activeKey={activeKey} />;
}
