import { replaceUri } from '@creator-network/core';
import { useAssetEditor } from '@creator-network/react/asset/editor';
import { selectFile } from '@creator-network/react/utils';
import { Avatar } from 'antd';

export type AssetCardProps = {
  name: string;
  hubName?: string;
  hubAvatar?: string;
  image?: string;
};

export function AssetCard(props: AssetCardProps) {
  const { metadata, setMetadata } = useAssetEditor();
  const handleClick = async () => {
    const f = await selectFile('image/*');
    if (f) {
      setMetadata({ ...metadata!, image: URL.createObjectURL(f) });
    }
  };

  return (
    <div className="shadow-md rounded-lg self-center overflow-hidden w-[240px]">
      <div
        className="w-full aspect-[2/1] p-0 cursor-pointer"
        title="Select cover"
        onClick={handleClick}
      >
        {props.image && (
          <img
            src={replaceUri(props.image)}
            alt=""
            className="w-full object-cover h-full"
          />
        )}
        {!props.image && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            Select cover
          </div>
        )}
      </div>
      <div className="line-clamp-2 text-xl flex-1 px-4 py-1 font-bold">
        {props.name}
      </div>
      <div className="px-4 pt-4 text-lg flex items-center">
        <Avatar size={32} src={replaceUri(props.hubAvatar)} />
        <div>{props.hubName}</div>
      </div>
      <div className="mt-4"></div>
    </div>
  );
}
