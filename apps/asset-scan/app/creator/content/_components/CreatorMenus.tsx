'use client';
import { Menu } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import { usePathname } from 'next/navigation';

const menuItems: MenuItemType[] = [
  {
    key: 'content',
    label: 'Content',
  },
];

export function CreatorMenus({ className }: { className?: string }) {
  const pathNames = usePathname();
  const selectedKeys: string[] = [];
  menuItems.forEach((item) => {
    if (pathNames.includes('/creator/' + item.key)) {
      selectedKeys.push(item.key.toString());
    }
  });

  return (
    <div className={className}>
      <Menu items={menuItems} selectedKeys={selectedKeys} />
    </div>
  );
}
