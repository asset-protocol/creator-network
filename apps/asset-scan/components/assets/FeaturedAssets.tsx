import { fetchAssets } from '@/creatornetwork';
import { Asset, replaceUri } from '@creator-network/core';
import { fromNow } from '@creator-network/react/utils';
import { Tag } from 'antd';
import { PresetColors } from 'antd/es/theme/internal';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { StudioAvatar } from '../studio/StudioAvatar';

function split<T>(source: T[]): T[][] {
  const res: T[][] = [];
  let i = 0;
  for (const item of source) {
    if (res[i] && res[i].length < 3) {
      res[i].push(item);
    } else {
      const length = res.push([item]);
      i = length - 1;
    }
  }
  return res;
}

export async function FeaturedAssets({ className }: { className?: string }) {
  const assets = await fetchAssets({
    first: 6,
    orderBy: ['timestamp_DESC'],
  });
  const data = split(assets.assets);
  return (
    <div className={clsx('flex', className)}>
      <div className="carousel carousel-vertical">
        {data.map((items, i) => {
          return (
            <div
              key={i.toString()}
              className="carousel-item h-full w-full flex flex-col gap-4"
            >
              {items.map((a) => (
                <AssetItem
                  key={a.id}
                  asset={a}
                  className="bg-base-100 rounded-md"
                />
              ))}
            </div>
          );
        })}
      </div>
      <div className="divider divider-horizontal mx-6 before:bg-[#00AAA1] before:w-1" />
    </div>
  );
}

export function PopularAssetItem(props: AssetItemProps) {
  const { asset, className } = props;
  return (
    <div className={clsx('grid grid-cols-2 w-full py-4 gap-4', className)}>
      <Link href={`/a/${asset.id}`}>
        <Image
          src={replaceUri(asset.image) ?? ''}
          alt={asset.name}
          width={320}
          height={200}
          className="object-cover flex-1 aspect-[3/2] rounded-lg w-full"
        ></Image>
      </Link>
      <div className="flex-1 flex flex-col">
        <div className="flex gap-2 flex-wrap">
          <div className="badge bg-[#DFF1F0] rounded-md px-3 py-3 text-gray-800">
            {asset.type}
          </div>
          {asset.tags ? (
            asset.tags.slice(0, 2).map((t, i) => (
              <Tag
                className="mr-0"
                key={t.name + i}
                color={
                  PresetColors[Math.floor(Math.random() * PresetColors.length)]
                }
              >
                {t.name}
              </Tag>
            ))
          ) : (
            <></>
          )}
        </div>
        <Link
          href={`/a/${asset.id}`}
          className="text-base font-semibold mt-4 line-clamp-2 text-black"
        >
          {asset.name}
        </Link>
        <div className=" flex-1"></div>
        {props.secondHeader || (
          <div className="text-gray-500 text-sm flex items-center py-2">
            <StudioAvatar hub={asset.hub} />
            <div className="divider divider-horizontal mx-1"></div>
            <div>{fromNow(Number.parseInt(asset.timestamp.toString()))}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function PopularAssets({ className }: { className?: string }) {
  const assets = await fetchAssets({
    first: 4,
    orderBy: ['collectCount_DESC', 'timestamp_ASC'],
  });
  return (
    <div>
      {assets.assets.map((asset) => {
        return <PopularAssetItem key={asset.id} asset={asset} className="" />;
      })}
    </div>
  );
}

export type AssetItemProps = {
  asset: Asset;
  descriptionDisabled?: boolean;
  className?: string;
  imageClassName?: string;
  titleClsName?: string;
  secondHeader?: ReactNode;
};
export function AssetItem(props: AssetItemProps) {
  const { asset, className } = props;
  return (
    <div className={clsx('grid grid-cols-2 w-full p-4 gap-4', className)}>
      <Link href={`/a/${asset.id}`}>
        <Image
          src={replaceUri(asset.image) ?? ''}
          alt={asset.name}
          width={320}
          height={200}
          className="object-cover flex-1 aspect-[2/1] rounded-lg w-full"
        ></Image>
      </Link>
      <div className="flex-1">
        <div className="flex gap-2 flex-wrap">
          <div className="badge bg-[#DFF1F0] rounded-md px-3 py-3 text-gray-800">
            {asset.type}
          </div>
          {asset.tags ? (
            asset.tags.slice(0, 3).map((t, i) => (
              <Tag
                className="mr-0"
                key={t.name + i}
                color={
                  PresetColors[Math.floor(Math.random() * PresetColors.length)]
                }
              >
                {t.name}
              </Tag>
            ))
          ) : (
            <div></div>
          )}
        </div>
        <Link
          href={`/a/${asset.id}`}
          className="text-xl font-bold mt-4 line-clamp-2 text-black"
        >
          {asset.name}
        </Link>
        {props.secondHeader || (
          <div className="text-gray-500 text-sm flex items-center py-4">
            <StudioAvatar hub={asset.hub} />
            <div className="divider divider-horizontal mx-1"></div>
            <div>{fromNow(Number.parseInt(asset.timestamp.toString()))}</div>
          </div>
        )}
        {props.descriptionDisabled !== true && (
          <div className="text-gray-400 line-clamp-2 my-2 text-sm">
            {asset.description}
          </div>
        )}
      </div>
    </div>
  );
}
