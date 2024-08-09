'use client';

import { Tabs } from 'antd';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type TabItem = {
  key: string;
  label: React.ReactNode;
  link?: string;
};

export type RouteTabsProps = {
  items?: TabItem[];
  activeType?: 'search' | 'path';
  onchange?: (key: string) => void;
};

export function RouteTabs(props: RouteTabsProps) {
  const pathName = usePathname();
  const { push } = useRouter();

  let activeKey = pathName.split('/').pop();
  const handleSelect = (key: string) => {
    const item = props.items?.find((t) => t.key === key);
    if (item?.link) {
      push(item.link);
    }
    props.onchange?.(key);
  };
  return (
    <Tabs
      items={props.items}
      activeKey={activeKey}
      onChange={handleSelect}
    ></Tabs>
  );
}
