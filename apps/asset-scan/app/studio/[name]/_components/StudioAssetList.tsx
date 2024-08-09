import { fetchAssets } from '@/creatornetwork';
import { RecentlyAssetItem } from '@/components/assets/RecentlyAssetItem';
import { Empty } from 'antd';

export async function StudioAssetList({ studioId }: { studioId: string }) {
  const res = await fetchAssets({
    hub: studioId,
    orderBy: ['timestamp_DESC'],
    first: 99999,
  });

  if (!res.assets) return <Empty />;
  return (
    <div className="grid grid-cols-3 gap-4">
      {res.assets.map((a) => (
        <RecentlyAssetItem key={a.id} asset={a} />
      ))}
    </div>
  );
}
