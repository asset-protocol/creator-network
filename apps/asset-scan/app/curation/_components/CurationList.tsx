import { replaceUri } from '@creator-network/core';
import { Curation } from '@creator-network/indexer-js';
import { fromNow } from '@creator-network/react/utils';
import { Avatar, Divider } from 'antd';
import Image from 'next/image';
import { fetchCurations } from './api';

export async function CurationList() {
  const curations = await fetchCurations();
  return (
    <div className="flex flex-col gap-4">
      {curations.map((c) => (
        <CurationListItem key={c.id} curation={c} />
      ))}
    </div>
  );
}

export function CurationListItem({ curation }: { curation: Curation }) {
  return (
    <div className="flex items-center overflow-auto">
      <div className="flex flex-col flex-1">
        <h1 className="font-semibold line-clamp-3 text-xl">{curation.name}</h1>
        <div className="flex items-center">
          <Avatar size={36} className="bg-primary">
            {curation.publisher[curation.publisher.length - 1]}
          </Avatar>
          <Divider type="vertical" className="bg-black" />
          <div>{fromNow(Number.parseFloat(curation.timestamp))}</div>
          <Divider type="vertical" className="bg-black" />
          <div>{curation.assets.length} Assets</div>
        </div>
        <div>{curation.description}</div>
      </div>
      <div className="aspect-[1/1] flex-1 pt-8 pl-8 flex border-solid border border-1 border-gray-600">
        <div className=" absolute t-0 l-0 mt--8 ml--8 bg-green-200 w-[50%] h-[50%]"></div>
        <div className="flex-1">
          <Image
            width={400}
            height={200}
            alt={curation.name}
            src={replaceUri(curation.image) ?? ''}
            className="rounded-lg w-full h-full z-2 overflow-hidden"
          ></Image>
        </div>
      </div>
    </div>
  );
}
