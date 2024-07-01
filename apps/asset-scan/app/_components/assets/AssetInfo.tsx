'use client';
import { Asset } from '@creator-network/core';
import { AddressLink } from '../address/AddressLink';
import { message } from 'antd';
import clsx from 'clsx';

export type AssetWeb3InfoProps = {
  asset: Asset;
  className?: string;
};
export function AssetWeb3Info({ asset, className }: AssetWeb3InfoProps) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="font-semibold">Publisher: </div>
      <AddressLink address={asset.publisher} herf=""></AddressLink>
      <div className="mt-2 font-semibold">Studio Address: </div>
      <AddressLink address={asset.hub.id} herf=""></AddressLink>
      <div className="mt-2 font-semibold">Content URI: </div>
      <AddressLink
        address={asset.contentUri}
        splitNum={16}
        herf=""
      ></AddressLink>
      <div className="mt-2 font-semibold">Tx hash: </div>
      <AddressLink address={asset.hash} splitNum={16} herf=""></AddressLink>
      <div className="mt-2 font-semibold">Collect NFT: </div>
      <AddressLink address={asset.collectNft} herf=""></AddressLink>
    </div>
  );
}
