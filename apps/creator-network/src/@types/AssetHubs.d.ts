interface AssetHubsMenu {
  id: string
  name: string
}

interface AssetHubs extends AssetHubsMenu{
  id: string
  name: string
  admin: string
  createAssetModule: string
  feeCollectModule: string
  hash: string
  implementation: string
  nftGatedModule: string
  timestamp: string
  tokenCollectModule: string
  version: string
}