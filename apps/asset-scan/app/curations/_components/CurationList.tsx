import { indexerClient } from '@/app/_creatornetwork';
import { replaceUri } from '@creator-network/core';
import { Curation } from '@creator-network/indexer-js';
import { fromNow } from '@creator-network/react/utils';
import { Avatar, Divider } from 'antd';
import Image from 'next/image';

export async function CurationList() {
  const curations = await indexerClient().curations.fetchCurations();
  return (
    <div className="flex flex-col gap-4">
      {curations.map((c) => (
        <CurationListItem curation={c} />
      ))}
    </div>
  );
}

export function CurationListItem({ curation }: { curation: Curation }) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col flex-1">
        <div>{curation.name}</div>
        <div className="flex items-center">
          <Avatar size={36} className="bg-primary">
            {curation.publisher[curation.publisher.length - 1]}
          </Avatar>
          <Divider type="vertical" />
          <div>{fromNow(Number.parseFloat(curation.timestamp))}</div>
          <Divider type="vertical" />
          <div>{curation.assets.length} Assets</div>
        </div>
        <div>{curation.description}</div>
      </div>
      <div className="flex-1">
        <Image
          width={400}
          height={200}
          alt={curation.name}
          src={replaceUri(curation.image)!}
          className="aspect-[2/1]"
        ></Image>
      </div>
    </div>
  );
}
