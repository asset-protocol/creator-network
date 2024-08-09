import { BytesLike } from "ethers";

export type AssetMetadata = {
  type: string;
  name: string;
  content: string;
  description?: string;
  image?: string;
  tags?: string[];
  properties?: { [key in string]: any };
}

export type AssetModule = {
  module: string;
  initData?: BytesLike;
};
