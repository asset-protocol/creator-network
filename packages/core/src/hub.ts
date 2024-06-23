export type AssetHubInfo = {
  id: string;
  name: string;
  admin: string;
  nftGatedModule: string;
  feeCollectModule: string;
  tokenCollectModule: string;
  implementation: string;
  timestamp: bigint;
  version: string;
  hash: string;

  metadata?: AssetHubMetadata;
};

export type AssetHubMetadata = {
  name: string;
  description?: string;
  image: string;
  external_url?: string;
  banner_image?: string;
};
