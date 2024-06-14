import { AssetClientViewer } from "@/app/_components/assets/AssetViewer";
import { AssetViewerProps } from "@creator-network/react/asset/viewer";
import { replaceUri } from "@creator-network/core";
import { Metadata, ResolvingMetadata } from "next";
import { fromNow } from "@creator-network/react/utils";
import { fetchAssetById } from "@/app/_creatornetwork";
import { AssetWeb3Info } from "@/app/_components/assets/AssetInfo";
import { MintButton } from "@/app/_components/assets/collect/MintButton";
import { AssetEditButton } from "@/app/_components/assets/AssetEditButton";

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

type Props = {
  params: { hub: string, assetId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { hub, assetId } = params;
  const asset = await fetchAssetById(hub, assetId);
  return {
    title: asset.name,
    openGraph: {
      images: [replaceUri(asset.image)!],
      title: asset.name,
      description: asset.description
    },
    description: asset.description
  }
}

export default async function AssetViewPage({ params }: { params: { hub: string, assetId: string } }) {
  const { hub, assetId } = params;
  const asset = await fetchAssetById(hub, assetId);
  const config: AssetViewerProps | undefined = asset
    ? {
      asset,
    }
    : undefined;

  return (
    <div className="flex flex-col m-auto w-full">
      {assetId !== "" ? (
        <div className="w-full lg:max-w-[1080px] mt-8 mx-auto">
          {config &&
            <div className="w-full flex flex-row gap-16">
              <div className="flex-1 overflow-auto">
                <div className="badge bg-[#DFF1F0] rounded-md px-3 py-3 text-gray-800">{asset.type}</div>
                <div className="text-3xl font-semibold py-4">
                  {asset.name}
                </div>
                <div className="text-gray-500 text-sm flex items-center py-2">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-5">
                      <span className="text-xs">{asset.hubName[0]}</span>
                    </div>
                  </div>
                  <span className="ml-1">{asset.hubName}</span>
                  <div className="divider divider-horizontal mx-1"></div>
                  <div>{fromNow(Number.parseInt(asset.timestamp.toString()))}</div>
                  <div className="flex-1"></div>
                  <MintButton asset={asset} />
                  {<AssetEditButton asset={asset} />}
                </div>
                {/* <Image
                  src={replaceUri(asset.image)!}
                  alt={asset.name}
                  className="aspect-[2/1] w-full py-4 rounded-lg"
                  width={400}
                  height={200}
                ></Image> */}
                <AssetClientViewer {...config} />
              </div>
              <div>
                <div className="text-xl font-bold mt-[20px] mb-[20px] max-w-[300px]">
                  <span className="bg-[#00AAA1] text-white mr-1">Asset</span>
                  Info
                </div>
                <AssetWeb3Info asset={asset} className="ml-1" />
              </div>
            </div>
          }
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
