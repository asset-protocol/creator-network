import { AssetHubInfo, replaceUri } from '@creator-network/core';
import { Avatar } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';

export function StudioAvatar({
  hub,
  avatarSize,
  className,
}: {
  hub: AssetHubInfo;
  avatarSize?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/studio/${hub.name}`}
      className={clsx('flex items-center', className)}
    >
      <Avatar src={replaceUri(hub.metadata?.image)} size={avatarSize ?? 24}>
        {hub.name?.[0]}
      </Avatar>
      <span className="ml-1 max-w-[100px] truncate">{hub.name}</span>
    </Link>
  );
}
