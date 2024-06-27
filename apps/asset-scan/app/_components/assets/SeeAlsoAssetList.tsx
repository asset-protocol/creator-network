'use client';

import { AssetItemProps } from '@/app/_components/assets/FeaturedAssets';
import { indexerClient } from '@/app/_creatornetwork';
import { Asset, replaceUri } from '@creator-network/core';
import { fromNow } from '@creator-network/react/utils';
import { Avatar, Button } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export function SeeAlsoAssetList({
  asset,
  className,
}: {
  asset: Asset;
  className: string;
}) {
  const [data, setData] = useState<Asset[]>([]);
  const [after, setAfter] = useState<string>();
  const [hasNext, setHasNext] = useState(false);

  const fetchData = async () => {
    const res = await indexerClient().assets.fetchAssets({
      tags: asset.tags?.map((t) => t.name),
      after: after,
      first: 10,
      orderBy: ['collectCount_DESC', 'timestamp_DESC'],
    });

    setData([...data, ...res.assets.filter((a) => a.id !== asset.id)]);
    setAfter(res.pageInfo.endCursor);
    setHasNext(res.pageInfo.hasNextPage);
  };

  useEffect(() => {
    fetchData();
  }, [asset]);

  return (
    <div className={className}>
      {data.map((a) => {
        return <SeeAlsoAssetItem key={a.id} className="gap-2" asset={a} />;
      })}
      {hasNext && (
        <Button type="link" className="mx-auto" onClick={fetchData}>
          加载更多
        </Button>
      )}
    </div>
  );
}

function SeeAlsoAssetItem(props: AssetItemProps) {
  const { asset, className } = props;
  return (
    <div
      className={clsx(
        'flex w-full py-4 gap-4 overflow-auto items-center',
        className
      )}
    >
      <Link href={`/${asset.id}`} className="flex-1 aspect-[3/2] w-full">
        <Image
          src={replaceUri(asset.image)!}
          alt={asset.name}
          width={320}
          height={200}
          className="object-cover rounded-lg w-full h-full"
        ></Image>
      </Link>
      <div className="flex-1 flex flex-col">
        <div className="flex gap-2 flex-wrap">
          <div className="badge bg-[#DFF1F0] rounded-md px-3 py-1 text-gray-800">
            {asset.type}
          </div>
        </div>
        <Link
          href={`/${asset.id}`}
          className="text-base font-semibold mt-2 line-clamp-2"
        >
          {asset.name}
        </Link>
        <div className=" flex-1"></div>
        <div className="text-gray-500 text-sm flex items-center py-2 gap-1">
          <Avatar
            shape="circle"
            src={replaceUri(asset.hub.metadata?.image)}
            size={24}
          >
            {asset.hub.name[0]}
          </Avatar>
          <div className="line-clamp-1">
            {fromNow(Number.parseInt(asset.timestamp.toString()))}
          </div>
        </div>
      </div>
    </div>
  );
}
