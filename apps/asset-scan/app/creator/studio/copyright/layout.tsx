import React from 'react';
import { RouteTabs, TabItem } from '@/components/ui/RouteTabs';

export default function ({ children }: { children: React.ReactNode }) {
  const tabs: TabItem[] = [
    {
      key: 'approving',
      label: 'Curation Approving',
      link: '/creator/studio/copyright/approving',
    },
  ];
  return (
    <div className="">
      <RouteTabs items={tabs} />
      {children}
    </div>
  );
}
