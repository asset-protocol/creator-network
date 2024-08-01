import { fetchAssets } from '@/creatornetwork';
import { RecentlyAssetItem } from './RecentlyAssetItem';
import { Asset } from '@creator-network/core';
import { List } from 'antd';

export async function RecentlyAssets() {
  const assets = await fetchAssets({
    orderBy: ['timestamp_DESC'],
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      {assets.assets.map((a) => {
        return <RecentlyAssetItem key={a.id} asset={a} />;
      })}
    </div>
  );
}
