import { Button, Dropdown, Menu, MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import React from 'react';
import { AccountButton } from '../account/AccountButton';
import { BadgePlus, BookText, FileText, SwatchBook } from 'lucide-react';

export function AppHeader() {
  const items: MenuProps['items'] = [
    {
      label: 'Assets',
      key: 'assets',
    },
    {
      label: <Link href="/curation">Curation</Link>,
      key: 'curation',
    },
    {
      label: 'Apps',
      key: 'apps',
      children: [
        {
          label: 'DeSchool',
          key: 'DeSchool',
        },
        {
          label: 'Booth',
          key: 'Booth',
        },
      ],
    },
    {
      label: 'About',
      key: 'about',
    },
  ];

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
    <Header className="flex items-center bg-[#E8F3F3] py-[10px] px-0 gap-4">
      <div>
        <Link href="/" className="btn btn-ghost text-xl">
          Creator Network
        </Link>
      </div>
      <Menu
        items={items}
        mode="horizontal"
        className="flex-1"
        activeKey='Curation'
        subMenuOpenDelay={0}
      ></Menu>
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
