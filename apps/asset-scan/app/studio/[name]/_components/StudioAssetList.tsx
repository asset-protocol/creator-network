import { RecentlyAssetItem } from '@/app/_components/assets/RecentlyAssetItem';
import { fetchAssets } from '@/app/_creatornetwork';
import { Empty } from 'antd';

export async function StudioAssetList({ studioId }: { studioId: string }) {
  const res = await fetchAssets({
    hub: studioId,
    orderBy: ['timestamp_DESC'],
    first: 99999,
  });
  return (
    <div className="grid grid-cols-3 gap-4">
      {res.assets?.length > 0 ? (
        res.assets.map((a) => (
          <RecentlyAssetItem key={a.id} asset={a} />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
}
