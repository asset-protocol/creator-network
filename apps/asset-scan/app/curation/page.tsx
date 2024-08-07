import { CurationList } from './_components/CurationList';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '资产策展-链上数字资产的聚合、分发和交易工具',
    description: '资产策展-帮助创作者聚合和分发数字资产',
    openGraph: {
      title: '资产策展-链上数字资产的聚合、分发和交易工具',
      description: '资产策展-帮助创作者聚合和分发数字资产',
    },
  };
}

export default function Page() {
  return (
    <div className="w-full max-w-[960px] mx-auto">
      <div className="text-2xl font-bold mt-[60px] mb-[40px]">
        All
        <span className="bg-[#00AAA1] text-white ml-1">Curations</span>
      </div>
      <CurationList />
    </div>
  );
}
