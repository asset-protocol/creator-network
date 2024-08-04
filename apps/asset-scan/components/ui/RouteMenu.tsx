'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number] & {
  link?: string;
};

export type RouteMenuProps = Omit<
  MenuProps,
  'items' | 'onSelect' | 'selectedKeys'
> & {
  items?: MenuItem[];
};
export function RouteMenu(props: RouteMenuProps) {
  const pathName = usePathname();
  const { push } = useRouter();
  const activeKey = pathName.split('/').pop();

  const handleChange = (k: string) => {
    const item = props.items?.find((t) => t.key === k);
    if (item?.link) {
      push(item.link);
    }
  };

  return (
    <Menu
      items={props.items}
      selectedKeys={activeKey ? [activeKey] : []}
      onSelect={(t) => handleChange(t.key)}
    />
  );
}
