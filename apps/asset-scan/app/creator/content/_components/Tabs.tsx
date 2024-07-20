'use client';

import { Tabs, TabsProps } from 'antd';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
export type ContentTabsProps = {
  items: TabsProps['items'];
};
export function ContentTabs(props: ContentTabsProps) {
  const { push } = useRouter();
  const pathNames = usePathname().split('/');
  const activeKey = pathNames[pathNames.length - 1];

  return (
    <Tabs
      items={props.items}
      activeKey={activeKey}
      onChange={(key) => push(`/creator/content/${key}`)}
    />
  );
}
