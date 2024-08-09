import { Button, Dropdown, MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import React from 'react';
import { BadgePlus, BookText, FileText, SwatchBook } from 'lucide-react';
import { AppTabs } from './AppTabs';
import AccountButton from '../account/AccountButton';

export function AppHeader() {
  const createMenuItems: MenuProps['items'] = [
    {
      label: <Link href="/creator/asset/create">Asset</Link>,
      key: 'Asset',
      icon: <FileText strokeWidth={1} />,
    },
    {
      label: <Link href="/creator/curation/create">Curation</Link>,
      key: 'Curation',
      icon: <SwatchBook strokeWidth={1} />,
    },
    {
      label: <Link href="/creator/studio/create">Studio</Link>,
      key: 'studio',
      icon: <BookText strokeWidth={1} />,
    },
  ];

  return (
    <Header className="flex items-center bg-[#E8F3F3] px-0 gap-2">
      <div>
        <Link href="/" className="text-xl font-semibold cursor-pointer px-2">
          Creator Network
        </Link>
      </div>
      <AppTabs />
      <Dropdown
        transitionName=""
        menu={{ items: createMenuItems, className: 'min-w-[160px]' }}
        trigger={['click']}
      >
        <Button
          type="text"
          shape="circle"
          size="large"
          className="text-gray-600"
          icon={<BadgePlus strokeWidth={1.4} size={32} />}
        ></Button>
      </Dropdown>
      <AccountButton />
    </Header>
  );
}
