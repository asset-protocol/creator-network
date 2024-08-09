'use client';
import { Menu } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const menuItems: MenuItemType[] = [
  {
    key: 'content',
    label: 'Content',
  },
  {
    key: 'copyright',
    label: 'Copyright',
  },
];

export function CreatorMenus({ className }: { className?: string }) {
  const pathNames = usePathname();
  const { push } = useRouter();
  const selectedKeys: string[] = [];
  menuItems.forEach((item) => {
    if (pathNames.includes('/creator/studio/' + item.key)) {
      selectedKeys.push(item.key.toString());
    }
  });
  const handleSelect = (key: string) => {
    push(`/creator/studio/${key}`);
  };

  return (
    <div className={className}>
      <Menu
        items={menuItems}
        onSelect={(t) => handleSelect(t.key)}
        selectedKeys={selectedKeys}
      />
    </div>
  );
}
