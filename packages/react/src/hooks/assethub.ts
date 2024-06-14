import { HubCreateDataStruct, NewAssetHub, NewAssetHubManager, NewTokenGlobalModule, PayableOverrides, assethub, tokenGlobalModule } from "@creator-network/web3";
import { useAssetHub } from "../context/provider";
import { BytesLike, ZeroAddress } from 'ethers';
import { useEffect, useState } from "react";
import { INGORED_ADDRESS, ZERO_BYTES } from "@creator-network/core";

export function useDeployNewAssetHub() {
  const { manager, contractRunner } = useAssetHub();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string>();
  const zeroAssetHubCreateData: Partial<HubCreateDataStruct> = {
    admin: ZeroAddress,
    name: "",
    createModule: ZeroAddress,
  }
  const deploy = async (data: HubCreateDataStruct) => {
    if (!contractRunner || !manager) {
      throw new Error("contractRunner not found");
    }
    setIsLoading(true);
    try {
      if (!data.name) {
        throw new Error("name is required");
      }
      const createData = {
        ...zeroAssetHubCreateData,
        ...data,
      };
      let hub: string | undefined;
      const assetHubManager = NewAssetHubManager(contractRunner, manager.id)
      if (!contractRunner?.isMulti) {
        hub = await assetHubManager.deploy.staticCall(createData);
      }
      const res = await assetHubManager.deploy(createData);
      await res.wait();
      console.log("asset hub created: ", hub);
      setData(hub);
      return hub;
    } finally {
      setIsLoading(false);
    }
  }
  return { deploy, data, isLoading };
}

export function useHasNamedHub() {
  const { manager, contractRunner } = useAssetHub();
  const [loading, setLoading] = useState(false);
  const hasNamedHub = async (hubId: string) => {
    if (!contractRunner || !manager) {
      throw new Error("ContractRunner is not set");
    }
    setLoading(true);
    try {
      const assetHubManager = NewAssetHubManager(contractRunner, manager.id)
      const exists = await assetHubManager.assetHubInfoByName(hubId);
      return exists.feeCollectModule !== ZeroAddress;
    } finally {
      setLoading(false);
    }
  }
  return { hasNamedHub, isLoading: loading };
}

export type AssetCreateData = Partial<assethub.DataTypes.AssetCreateDataStruct>;

function checkCreateData(data: AssetCreateData): assethub.DataTypes.AssetCreateDataStruct {
  data.publisher = data.publisher || ZeroAddress;
  data.contentURI = data.contentURI || "";
  data.assetCreateModuleData = data.assetCreateModuleData || ZERO_BYTES;
  data.collectModule = data.collectModule || ZeroAddress;
  data.collectModuleInitData = data.collectModuleInitData || ZERO_BYTES;
  data.gatedModule = data.gatedModule || ZeroAddress;
  data.gatedModuleInitData = data.gatedModuleInitData || ZERO_BYTES;
  return data as assethub.DataTypes.AssetCreateDataStruct;
}

export function useCreateAsset() {
  const { contractRunner } = useAssetHub();
  const [isLoading, setIsLoading] = useState(false);
  const create = async (hub: string, data: AssetCreateData) => {
    if (!contractRunner) {
      throw new Error("contractRunner is undefined");
    }
    const assetHub = NewAssetHub(contractRunner, hub);
    setIsLoading(true);
    const createData = checkCreateData(data);
    console.log("createData", createData)
    try {
      let tokenId: bigint | undefined = undefined;
      if (!contractRunner.isMulti) {
        tokenId = await assetHub.create.staticCall(createData);
      }
      const res = await assetHub.create(createData);
      await res.wait();
      return tokenId;
    } finally {
      setIsLoading(false);
    }
  }
  return { create, isLoading };
}

export type UpdateAssetInput = Partial<assethub.DataTypes.AssetUpdateDataStruct>;

function checkUpdateData(data: UpdateAssetInput): assethub.DataTypes.AssetUpdateDataStruct {
  data.collectModule = data.collectModule || INGORED_ADDRESS;
  data.collectModuleInitData = data.collectModuleInitData || ZERO_BYTES;
  data.gatedModule = data.gatedModule || INGORED_ADDRESS;
  data.gatedModuleInitData = data.gatedModuleInitData || ZERO_BYTES;
  data.contentURI = data.contentURI || "";
  return data as assethub.DataTypes.AssetUpdateDataStruct;
}

export function useUpdateAsset() {
  const { contractRunner } = useAssetHub();
  const [isLoading, setIsLoading] = useState(false);
  const update = async (hub: string, assetId: bigint, data: UpdateAssetInput) => {
    if (!contractRunner) {
      throw new Error("contractRunner is undefined");
    }
    const assetHub = NewAssetHub(contractRunner, hub);
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


export type CollectData = {
  collectData: BytesLike;
}

export function useCollectAsset() {
  const { contractRunner } = useAssetHub();
  const [isLoading, setIsLoading] = useState(false);
  const collect = async (hub: string, assetId: bigint, collectData: CollectData, options?: PayableOverrides) => {
    if (!contractRunner) {
      throw new Error("contractRunner is undefined");
    }
    const assetHub = NewAssetHub(contractRunner, hub);
    setIsLoading(true);
    try {
      let tokeNftId: bigint | undefined = undefined;
      if (!contractRunner.isMulti) {
        tokeNftId = await assetHub.collect.staticCall(assetId, collectData.collectData, options ?? {});
      }
      console.log("tokeNftId", tokeNftId)
      const res = await assetHub.collect(assetId, collectData.collectData, options ?? {});
      await res.wait();
      return tokeNftId;
    } finally {
      setIsLoading(false);
    }
  }
  return { collect, isLoading };
}

export function useGetHubGlobalModuleConfig(globalModule: string, hub?: string) {
  const { contractRunner } = useAssetHub();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<tokenGlobalModule.AssetTokenConfigStructOutput>();

  useEffect(() => {
    getConfig(hub).then((res) => {
      setConfig(res);
    })
  }, [hub]);

  const getConfig = async (hub?: string) => {
    if (!hub) {
      return;
    }
    if (globalModule === ZeroAddress) {
      return;
    }
    try {
      setLoading(true);
      const module = NewTokenGlobalModule(contractRunner!, globalModule);
      const res = await module.assetHubConfig(hub);
      return res;
    } finally {
      setLoading(false);
    }
  }
  return { config, loading }
}