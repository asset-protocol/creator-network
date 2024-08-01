import { Avatar, Image, Skeleton, Tag } from 'antd';
import { Asset, replaceUri } from '@creator-network/core';
import { PresetColors } from 'antd/es/theme/interface';
import { fromNow } from '@creator-network/react/utils';

export function AssetItem(props: {
  value: Asset;
  classname?: string;
  footer?: React.ReactNode;
}) {
  const { value } = props;

  return (
    <div className="shadow-md rounded overflow-hidden flex flex-col w-full h-full">
      {
        <Image
          title="asset image"
          preview={false}
          className="aspect-[2/1] cursor-pointer object-cover w-full"
          src={replaceUri(value.image) ?? ''}
          placeholder={
            <Skeleton.Image
              active
              rootClassName="!w-full !aspect-[2/1]"
              className="!w-full !h-full"
            />
          }
        ></Image>
      }
      {!value.name && (
        <div
          className="text-3xl aspect-[2/1] flex items-center justify-center bg-gray-200 font-bold"
        >
          No Metadata
        </div>
      )}
      <div className="py-4 px-2 flex-1 flex flex-col gap-2">
        <div className="text-lg font-bold">
          <div
            className="flex-1 cursor-pointer line-clamp-1 hover:underline"
            title={value.name}
          >
            {value.name ?? '---'}
          </div>
        </div>
        <div className="line-clamp-1">{value.description}</div>
        <div className="flex-1 flex gap-2">
          {value.tags ? (
            value.tags.map((t, i) => (
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
        {props.footer ? (
          props.footer
        ) : (
          <div className="flex items-center">
            {/* <div>{value.collectCount?.toString() ?? 0} Collected</div> */}
            <Avatar
              size="small"
              style={{
                backgroundColor: '#94a3af',
                marginRight: '4px',
              }}
            >
              {value.hub.name[0]}
            </Avatar>
            <span className="text-gray-500 flex-1 line-clamp-1">
              {value.hub.name}
              <span className="font-bold">#</span>
              {value.assetId.toString()}
            </span>
            <div className="text-gray-500 ">
              {fromNow(Number.parseInt(value.timestamp.toString()))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
