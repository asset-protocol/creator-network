export type AssetType = "image" | "video" | "audio" | "markdown" | string;

interface Asset {
  id: string;
  assetId: bigint;
  type: AssetType;
  name: string;
  image: string;
  content: string;
  description: string;
  contractAddress: string;
  publisher: string;
  contentUri?: string;
  timestamp: bigint;
  hash: string;
  tags: string;
  metadata?: string;
  collectModule?: string;
  collectModuleInitData?: string;
  collectNft?: string;
  collectCount?: bigint;
  gatedModule?: string
  gatedModuleInitData?: string
}

interface AssetHubInfo {
  id: string
  name: string
  admin: string
  nftGatedModule: string
  feeCollectModule: string
  implementation: string
  timestamp: bigint
  version: string
  hash: string
}