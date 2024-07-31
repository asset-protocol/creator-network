import { indexerClient } from '@/app/_creatornetwork';
import { TwitterOutlined, DiscordOutlined } from '@ant-design/icons';
import { replaceUri } from '@creator-network/core';
import { Avatar } from 'antd';
import Link from 'next/link';

export async function TopAuthors() {
  const studios = await indexerClient().assetHubs.fetchAssetHubs(undefined, 5);
  return (
    <div className="flex flex-col gap-4">
      {studios.map((s) => {
        return (
          <div key={s.id} className="flex gap-4 items-center">
            <Link href={`/studio/${s.name}`}>
              <Avatar size={64} src={replaceUri(s.metadata?.image)}>
                {s.name[0]}
              </Avatar>
            </Link>
            <div className="flex-1 flex flex-col gap-2">
              <Link href={`/studio/${s.name}`}>
                <span>{s.name}</span>
              </Link>
              <span className="text-sm line-clamp-1 text-gray-400">
                {s.metadata?.description ?? 'No description'}
              </span>
              <div className="flex gap-2">
                <TwitterOutlined />
                <DiscordOutlined />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
