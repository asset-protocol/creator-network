import { EtherAddress } from "./common";

export type BytesLike = string | Uint8Array;

export type AssetType = "image" | "video" | "audio" | "markdown" | string;

export type AssetMetadata = {
  type: AssetType;
  name: string;
  content: string;
  description?: string;
  image?: string;
  tags?: string[];
  properties?: { [key in string]: any };
}

export type AssetModule = {
  module: EtherAddress;
  initData?: BytesLike;
};

export type Asset = {
  id: string;
  assetId: bigint;
  hub: string;
  hubName: string;
  type: AssetType;
  name: string;
  image: string;
  content: string;
  description: string;
  contractAddress: string;
  publisher: string;
  contentUri?: string;
  timestamp: bigint;
  lastUpdatedAt: bigint;
  hash: string;
  tags?: { name: string }[];
  metadata?: AssetMetadata;
  collectModule?: string;
  collectModuleInitData?: string;
  collectNft?: string;
  collectCount?: bigint;
  gatedModule?: string
  gatedModuleInitData?: string
  query1?: string;
  query2?: string;
}

export type StudioInfo = {
  id: string
  name: string
  admin: string
  nftGatedModule: string
  feeCollectModule: string
  tokenCollectModule: string
  implementation: string
  timestamp: bigint
  version: string
  hash: string
}