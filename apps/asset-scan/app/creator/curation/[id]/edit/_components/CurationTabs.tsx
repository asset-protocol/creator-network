'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Menu, MenuProps } from 'antd';
import { InfoIcon, Package2 } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
type MenuItem = Required<MenuProps>['items'][number];

export function CurationTabs({ curationId }: { curationId: string }) {
  const pathName = usePathname();
  const { push } = useRouter();
  const activeKey = pathName.split('/').pop();

  const menus: MenuItem[] = [
    {
      key: 'detail',
      label: 'Detail',
      icon: <InfoIcon size={18} />,
      className: 'flex items-center',
    },
    {
      key: 'assets',
      label: 'Assets',
      icon: <Package2 size={18} />,
      className: 'flex items-center',
    },
  ];
  const handleChange = (k: string) => {
    push(`/creator/curation/${curationId}/edit/${k}`);
  };

  return (
    <Menu
      items={menus}
      selectedKeys={activeKey ? [activeKey] : []}
      onSelect={(t) => handleChange(t.key)}
    />
  );
}
