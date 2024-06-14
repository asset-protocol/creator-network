
import { AssetItemProps } from "./FeaturedAssets"
import clsx from "clsx"
import Image from 'next/image'
import { replaceUri } from "@creator-network/core"
import { Tag } from "antd"
import { PresetColors } from "antd/es/theme/internal"
import { fromNow } from "@creator-network/react/utils"
import { redirectTheAsset } from "@/app/[hub]/_redirect"
import Link from "next/link"

export function RecentlyAssetItem(props: AssetItemProps) {
  const { asset, className } = props;
  return <div className={clsx("flex flex-col p-0 gap-4 w-full", className)}>
    <Link href={`/${asset.hub}/assets/${asset.assetId}`}>
      <Image
        src={replaceUri(asset.image)!}
        alt={asset.name}
        style={{ width: "100%" }}
        width={320}
        height={160}
        className="object-cover flex-1 aspect-[2/1] rounded-lg cursor-pointer"
      ></Image>
    </Link>
    <div className="flex-1 ">
      <div className="flex gap-2 flex-wrap">
        <div className="badge bg-[#DFF1F0] rounded-md px-3 py-3 text-gray-800">{asset.type}</div>
        {asset.tags ? (
          asset.tags.map((t, i) => (
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
      <Link href={`/${asset.hub}/assets/${asset.assetId}`}>
        <div
          className="text-xl font-bold mt-4 line-clamp-2 cursor-pointer"
        >{asset.name}</div>
      </Link>
      <div className="text-gray-500 text-sm flex items-center py-4">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-5">
            <span className="text-xs">{asset.hubName[0]}</span>
          </div>
        </div>
        <span className="ml-1">{asset.hubName}</span>
        <div className="divider divider-horizontal mx-1"></div>
        <div>{fromNow(Number.parseInt(asset.timestamp.toString()))}</div>
      </div>
      <div className="text-gray-400 line-clamp-2 my-2 text-sm">{asset.description}</div>
    </div>

  </div>
}