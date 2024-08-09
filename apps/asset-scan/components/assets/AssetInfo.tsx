'use client';
import { Asset } from '@creator-network/core';
import { AddressLink, BlobLink, TxLink } from '../address/AddressLink';
import clsx from 'clsx';

export type AssetWeb3InfoProps = {
  asset: Asset;
  className?: string;
};
export function AssetWeb3Info({ asset, className }: AssetWeb3InfoProps) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="font-semibold">Publisher: </div>
      <AddressLink address={asset.publisher}></AddressLink>
      <div className="mt-2 font-semibold">Studio Address: </div>
      <AddressLink address={asset.hub.id}></AddressLink>
      <div className="mt-2 font-semibold">Content URI: </div>
      <BlobLink address={asset.contentUri} splitNum={16}></BlobLink>
      <div className="mt-2 font-semibold">Tx hash: </div>
      <TxLink address={asset.hash} splitNum={16}></TxLink>
      <div className="mt-2 font-semibold">Collect NFT: </div>
      <AddressLink address={asset.collectNft}></AddressLink>
    </div>
  );
}
