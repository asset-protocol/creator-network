import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Empty } from 'antd';
import { RecentlyAssetItem } from '@/components/assets/RecentlyAssetItem';
import { fetchCurationById } from '../_components/api';
import { CurationItem } from '../_components/CurationInfo';
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const curation = await fetchCurationById(params.id);
  if (!curation) {
    return notFound();
  }
  return {
    title: curation.name,
    description: curation.description,
    openGraph: {
      title: curation.name,
      description: curation.description,
      images: [curation.image],
    },
  };
}
export default async function ({ params }: { params: { id: string } }) {
  const curation = await fetchCurationById(params.id);
  if (!curation) {
    return notFound();
  }

  return (
    <div className="w-full">
      <div className="px-[20px] w-full bg-[#F2F8F7] max-h-[880px] overflow-hidden">
        <CurationItem
          curation={curation}
          className="max-w-[1080px] mx-auto my-10 flex-wrap-reverse"
        />
      </div>
      <div className="max-w-[1080px] mx-auto">
        <div className="text-2xl font-bold mt-[60px] mb-[40px]">
          <span className="bg-[#00AAA1] text-white mr-1">Curation</span>
          Assets
        </div>
        <div className="grid grid-cols-3 gap-4">
          {curation.assets?.length > 0 ? (
            curation.assets.map((a) => (
              <RecentlyAssetItem key={a.asset.id} asset={a.asset} />
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}
