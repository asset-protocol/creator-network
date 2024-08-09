import { TabsProps } from 'antd';
import { ContentTabs } from './_components/Tabs';
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
    <div >
      <div className="text-xl font-semibold mb-4">工作室内容</div>
      <ContentTabs items={tabs} />
      <div className="p-4">{children}</div>
    </div>
  );
}
