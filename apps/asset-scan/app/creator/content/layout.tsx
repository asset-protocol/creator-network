import { TabsProps } from 'antd';
import { ContentTabs } from './_components/Tabs';
import { StudioHeader } from './_components/StudioHeader';
import { CreatorMenus } from './_components/CreatorMenus';

export default function ({ children }: { children: React.ReactNode }) {
  const tabs: TabsProps['items'] = [
    {
      key: 'assets',
      label: 'Assets',
    },
    {
      key: 'curations',
      label: 'Curations',
    },
  ];
  return (
    <div className="flex mt-6 gap-4">
      <div className="flex-shrink-0 w-[200px] justify-center">
        <StudioHeader className="w-full flex flex-col items-center justify-center gap-2" />
        <CreatorMenus className="mt-6" />
      </div>
      <div className="flex-1">
        <div className="text-xl font-semibold mb-4">工作室内容</div>
        <ContentTabs items={tabs} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
