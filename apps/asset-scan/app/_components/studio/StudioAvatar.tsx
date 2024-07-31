import { AssetHubInfo, replaceUri } from '@creator-network/core';
import { Avatar } from 'antd';
import Link from 'next/link';

export function StudioAvatar({ hub }: { hub: AssetHubInfo }) {
  return (
    <Link href={`/studio/${hub.name}`} className="flex items-center">
      <Avatar src={replaceUri(hub.metadata?.image)} size={24}>
        {hub.name[0]}
      </Avatar>
      <span className="ml-1 max-w-[100px] truncate">{hub.name}</span>
    </Link>
  );
}
