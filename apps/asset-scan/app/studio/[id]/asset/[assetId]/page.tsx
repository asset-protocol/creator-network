import { indexerClient } from '@/app/_creatornetwork';
import { notFound, redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { id: string; assetId: string };
}) {
  const asset = await indexerClient().assets.fetchAssetByBizId(
    params.id,
    params.assetId
  );
  if (!asset) {
    notFound();
  }
  redirect('/' + asset.id);
}
