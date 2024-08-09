import { AssetEditor } from '@/components/assets/AssetEdtor';
import { fetchAssetById } from '@/creatornetwork';
import { replaceUri } from '@creator-network/core';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { assetId: string };
}): Promise<Metadata> {
  const { assetId } = params;
  const asset = await fetchAssetById(assetId);
  return {
    title: 'Edit: ' + asset?.name,
    openGraph: {
      images: [replaceUri(asset?.image)!],
      title: asset?.name,
      description: asset?.description,
    },
    description: asset?.description,
  };
}

export default async function Page({
  params,
}: {
  params: { assetId: string };
}) {
  const asset = await fetchAssetById(params.assetId);
  if (!asset) {
    notFound();
  }
  return (
    <div className="max-w-[900px] mx-auto">
      <AssetEditor asset={asset!}></AssetEditor>
    </div>
  );
}
