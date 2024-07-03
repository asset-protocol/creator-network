import { Curation, fromNow, replaceUri } from '@repo/ui/asset';
import { Image, Skeleton } from 'antd';
import Link from 'next/link';

export function CurationItem({ curation }: { curation: Curation }) {
  return (
    <div className="shadow-md rounded overflow-hidden flex flex-col w-full h-full">
      {
        <Link href={`/curation/${curation.id}`}>
          <Image
            title="asset image"
            preview={false}
            className="aspect-[2/1] cursor-pointer object-cover w-full"
            src={replaceUri(curation.image)}
            placeholder={
              <Skeleton.Image
                active
                rootClassName="!w-full !aspect-[2/1]"
                className="!w-full !h-full"
              />
            }
          ></Image>
        </Link>
      }
      {!curation.name && (
        <Link href={`/curation/${curation.id}`}>
          <div className="text-3xl aspect-[2/1] flex items-center justify-center bg-gray-200 font-bold">
            No Metadata
          </div>
        </Link>
      )}
      <div className="py-4 px-2 flex-1 flex flex-col gap-2">
        <div className="text-lg font-bold">
          <Link href={`/curation/${curation.id}`}>
            <div className="flex">
              <div
                className="flex-1 cursor-pointer line-clamp-1 hover:underline"
                title={curation.name}
              >
                {curation.name ?? '---'}
              </div>
            </div>
          </Link>
        </div>
        <div className="line-clamp-1">{curation.description}</div>
      </div>
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="text-gray-500">
          {fromNow(Number.parseInt(curation.timestamp?.toString()))}
        </div>
      </div>
    </div>
  );
}
