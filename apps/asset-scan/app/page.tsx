import { RecentlyAssets } from './_components/assets/RecentlyAssets';
import {
  FeaturedAssets,
  PopularAssets,
} from './_components/assets/FeaturedAssets';
import { SearchWithTags } from './_components/assets/SearchWithTags';
import { TopAuthors } from './_components/assets/TopAuthors';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AssetScan-创作者数字资产一站式浏览与交易平台',
    description: 'Asset Scan',
    openGraph: {
      title: 'AssetScan-创作者数字资产一站式浏览与交易平台',
      description:
        'AssetScan 用于创建、浏览、更新和查看链上交易信息。无缝连接创作者和收藏家，发现独一无二的数字资产，体验前所未有的透明度和交易便捷性。立即加入，开启您的数字收藏之旅。',
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col mx-auto">
      <div className="px-[20px] w-full bg-[#F2F8F7] max-h-[880px] overflow-hidden">
        <div className=" flex mx-auto h-full max-w-[1280px]">
          <div className="flex-[2] h-full flex flex-col">
            <div className="text-xl font-bold mt-[60px] mb-[40px]">
              <span className="bg-[#00AAA1] text-white mr-1">Featured</span>
              This month
            </div>
            <FeaturedAssets className="flex-1 max-w-[830px] mb-[40px] h-[calc(100%-176px)] w-full" />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="text-xl font-bold mt-[60px] mb-[40px]">
              <span className="bg-[#00AAA1] text-white mr-1">Popular</span>
              Assets
            </div>
            <PopularAssets />
          </div>
        </div>
      </div>
      <div className="bg-base-100 w-full max-w-[1280px] mx-auto flex">
        <div className="flex-[2] pr-[105px] flex">
          <div className="flex-1">
            <div className="text-xl font-bold mt-[60px] mb-[40px]">
              <span className="bg-[#00AAA1] text-white mr-1">Recently</span>
              Assets
            </div>
            <RecentlyAssets />
          </div>
        </div>
        <div className="flex-1">
          <div>
            <div className="text-xl font-bold mt-[60px] mb-[40px]">
              <span className="bg-[#00AAA1] text-white mr-1">Top</span>
              Studios
            </div>
            <TopAuthors />
          </div>
          <div>
            <div className="text-xl font-bold mt-[60px] mb-[40px]">
              <span className="bg-[#00AAA1] text-white mr-1">Search</span>
              With Tags
            </div>
            <SearchWithTags />
          </div>
        </div>
      </div>
    </main>
  );
}
