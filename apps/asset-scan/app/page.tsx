import { RecentlyAssets } from "./_components/assets/RecentlyAssets";
import { FeaturedAssets, PopularAssets } from "./_components/assets/FeaturedAssets";
import { SearchWithTags } from "./_components/assets/SearchWithTags";
import { TopAuthors } from "./_components/assets/TopAuthors";

export default function Home() {
  return (
    <main className="flex flex-col mx-auto">
      <div className="px-[20px] w-full bg-[#F2F8F7] max-h-[880px]">
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
          <div >
            <div className="text-xl font-bold mt-[60px] mb-[40px]">
              <span className="bg-[#00AAA1] text-white mr-1">Top</span>
              Studios
            </div>
            <TopAuthors />
          </div>
          <div >
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
