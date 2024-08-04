import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Empty } from 'antd';
import { RecentlyAssetItem } from '@/components/assets/RecentlyAssetItem';
import { fetchCurationById } from '../_components/api';
import { CurationItem } from '../_components/CurationInfo';
import Ribbon from 'antd/es/badge/Ribbon';
import { AssetApprovalStatus, Curation } from '@creator-network/indexer-js';

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
              <CurationAssetItem asset={a} key={a.asset.id} />
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}

function CurationAssetItem({ asset }: { asset: Curation['assets'][0] }) {
  let props = { text: 'Approved', color: '#00AAA1' };
  switch (asset.status) {
    case AssetApprovalStatus.Approved:
      props = {
        text: 'Approved',
        color: 'green',
      };
      break;
    case AssetApprovalStatus.Pending:
      props = {
        text: 'Pending',
        color: '#9c9c9c',
      };
      break;
    case AssetApprovalStatus.Rejected:
      props = {
        text: 'Rejected',
        color: 'red',
      };
      break;
    default:
      break;
  }
  return (
    <Ribbon {...props} key={asset.asset.id}>
      <RecentlyAssetItem asset={asset.asset} />
    </Ribbon>
  );
}
