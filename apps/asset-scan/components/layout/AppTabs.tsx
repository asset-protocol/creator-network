'use client';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppTabs() {
  const pathName = usePathname();
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
  const activeKey =
    (items.find((t) => pathName.startsWith('/' + t?.key))?.key as string) ?? '';

  console.log('activeKey', activeKey);
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="flex-1 py-0"
      selectedKeys={[activeKey]}
      subMenuOpenDelay={0}
    ></Menu>
  );
}
