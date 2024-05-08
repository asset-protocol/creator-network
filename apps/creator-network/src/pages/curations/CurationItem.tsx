import { Curation, fromNow, replaceUri } from "@repo/ui/asset";
import { useGoCuration } from "~/utils/route";
import { Image, Skeleton } from "antd";

export function CurationItem({ curation }: { curation: Curation }) {
  const { goCuration } = useGoCuration();
  const openCuration = () => {
    goCuration(curation.id);
  };

  return (
    <div className="shadow-md rounded overflow-hidden flex flex-col w-full h-full">
      {
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
          onClick={openCuration}
        ></Image>
      }
      {!curation.name && (
        <div
          className="text-3xl aspect-[2/1] flex items-center justify-center bg-gray-200 font-bold"
          onClick={openCuration}
        >
          No Metadata
        </div>
      )}
      <div className="py-4 px-2 flex-1 flex flex-col gap-2">
        <div className="text-lg font-bold">
          <div className="flex">
            <div
              className="flex-1 cursor-pointer line-clamp-1 hover:underline"
              title={curation.name}
              onClick={openCuration}
            >
              {curation.name ?? "---"}
            </div>
          </div>
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