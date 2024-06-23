import { AssetHubInfo, replaceUri } from '@creator-network/core';
import { Avatar } from 'antd';

export function StudioAvatar({ hub }: { hub: AssetHubInfo }) {
  return (
    <>
      <Avatar src={replaceUri(hub.metadata?.image)} size={24}>
        {hub.name[0]}
      </Avatar>
      <span className="ml-1">{hub.name}</span>
    </>
  );
}
