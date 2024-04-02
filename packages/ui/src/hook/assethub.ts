import { useAssetHub } from "../context/provider";
import { DataTypes, NewERC20 } from '../client/assethub';
import { BytesLike, ZeroAddress } from 'ethers';
import { useCallback, useState } from "react";
import { AssetHubDeployDataStruct } from "../client/assethub/typechain-types/AssetHubManager";
import { AssetModule, ZERO_BYTES, parseFeeCollectModuleInitData } from "../core";

export function useDeployNewAssetHub() {
  const { assetHubManager } = useAssetHub();
  if (!assetHubManager) {
    throw new Error("AssetHubManager not found");
  }
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string>();
  const zeroAssetHubCreateData: Partial<AssetHubDeployDataStruct> = {
    admin: ZeroAddress,
    name: "",
    collectNft: true,
    assetCreateModule: ZeroAddress,
  }
  const deploy = async (data: AssetHubDeployDataStruct) => {
    setIsLoading(true);
    try {
      if (!data.name) {
        throw new Error("name is required");
      }
      const createData = {
        ...zeroAssetHubCreateData,
        ...data,
      };
      const hub = await assetHubManager.deploy.staticCall(createData);
      const res = await assetHubManager.deploy(createData);
      await res.wait();
      console.log("asset hub created: ", hub);
      setData(hub);
    } finally {
      setIsLoading(false);
    }
  }
  return { deploy, data, isLoading };
}

export type AssetCreateData = Partial<DataTypes.AssetCreateDataStruct>;

function checkCreateData(data: AssetCreateData): DataTypes.AssetCreateDataStruct {
  data.publisher = data.publisher || ZeroAddress;
  data.contentURI = data.contentURI || "";
  data.assetCreateModuleData = data.assetCreateModuleData || ZERO_BYTES;
  data.collectModule = data.collectModule || ZeroAddress;
  data.collectModuleInitData = data.collectModuleInitData || ZERO_BYTES;
  data.gatedModule = data.gatedModule || ZeroAddress;
  data.gatedModuleInitData = data.gatedModuleInitData || ZERO_BYTES;
  return data as DataTypes.AssetCreateDataStruct;
}

export function useCreateAsset() {
  const { assetHub } = useAssetHub();
  const [isLoading, setIsLoading] = useState(false);
  const create = useCallback(async (data: AssetCreateData) => {
    if (!assetHub) {
      throw new Error("asset hub not set");
    }
    setIsLoading(true);
    const createData = checkCreateData(data);
    console.log("createData", createData)
    try {
      const tokenId = await assetHub.create.staticCall(createData);
      const res = await assetHub.create(createData);
      await res.wait();
      return tokenId;
    } finally {
      setIsLoading(false);
    }
  }, [assetHub])
  return { create, isLoading };
}

export type UpdateAssetInput = Partial<DataTypes.AssetUpdateDataStruct>;

function checkUpdateData(data: UpdateAssetInput): DataTypes.AssetUpdateDataStruct {
  data.collectModule = data.collectModule || ZeroAddress;
  data.collectModuleInitData = data.collectModuleInitData || ZERO_BYTES;
  data.gatedModule = data.gatedModule || ZeroAddress;
  data.gatedModuleInitData = data.gatedModuleInitData || ZERO_BYTES;
  data.contentURI = data.contentURI || "";
  return data as DataTypes.AssetUpdateDataStruct;
}

export function useUpdateAsset() {
  const { assetHub } = useAssetHub();
  const [isLoading, setIsLoading] = useState(false);

  const update = async (assetId: bigint, data: UpdateAssetInput) => {
    if (!assetHub) {
      throw new Error("asset hub not set");
    }
    setIsLoading(true);
    try {
      const updateData = checkUpdateData(data);
      console.log("updatedata", updateData);
      console.log("assetId", assetId);
      const res = await assetHub.update(assetId, updateData);
      await res.wait();
    } finally {
      setIsLoading(false);
    }
  }
  return { update, isLoading };
}


export type CollectData = AssetModule & {
  collectData: BytesLike;
}

export function useCollectAsset() {
  const { assetHub, hubInfo, signer } = useAssetHub();
  const [isLoading, setIsLoading] = useState(false);
  const collect = async (assetId: bigint, collectData: CollectData) => {
    if (!assetHub || !hubInfo) {
      throw new Error("asset hub not set");
    }
    setIsLoading(true);
    try {
      if (collectData && collectData.module !== ZeroAddress && hubInfo.feeCollectModule === collectData.module) {
        const feeConfig = parseFeeCollectModuleInitData(collectData.initData);
        if (feeConfig && feeConfig.currency !== ZeroAddress && feeConfig.amount > 0) {
          const token = NewERC20(signer, feeConfig.currency);
          const allowance = await token.allowance(signer.getAddress(), hubInfo.feeCollectModule);
          if (allowance < feeConfig.amount) {
            const tx = await token.approve(hubInfo.feeCollectModule, feeConfig.amount);
            await tx.wait();
          }
        }
      }

      const tokeNftId = await assetHub.collect.staticCall(assetId, collectData.collectData);
      const res = await assetHub.collect(assetId, collectData.collectData);
      await res.wait();
      return tokeNftId;
    } finally {
      setIsLoading(false);
    }
  }
  return { collect, isLoading };
}
