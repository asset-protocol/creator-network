'use client';
import { Asset } from '@creator-network/core';
import { useAssetHub } from '@creator-network/react';
import { Button } from 'antd';
import Link from 'next/link';

export function AssetEditButton({ asset }: { asset: Asset }) {
  const { account } = useAssetHub();
  return (
    account?.address === asset.publisher && (
      <Link className="mx-2" href={`/creator/asset/${asset.id}/edit`}>
        <Button>Edit</Button>
      </Link>
    )
  );
}
