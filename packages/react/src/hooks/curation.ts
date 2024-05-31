import { useCallback, useState } from "react";
import { useAssetHub } from "../context";
import { NewCuration,curation } from "@creator-network/web3";
import { AssetApprovalStatus, CurationStatus } from "@creator-network/indexer-js";

export type CreateCurationInput = {
  contentURI: string;
  status: CurationStatus;
  assets: curation.CurationAssetStruct[];
  expiry: number;
};

export function useCreateCuration() {
  const { hubManagerInfo, contractRunner } = useAssetHub();
  const [loading, setLoading] = useState(false);

  const create = useCallback(
    async (args: CreateCurationInput) => {
      setLoading(true);
      try {
        if (hubManagerInfo && contractRunner) {
          const curation = NewCuration(contractRunner, hubManagerInfo.curation);
          console.log("creage args", args);
          let curationId: bigint | undefined;
          if (!contractRunner.isMulti) {
            curationId = await curation.create.staticCall(
              args.contentURI,
              args.status,
              args.expiry,
              args.assets
            );
          }
          const tx = await curation.create(
            args.contentURI,
            args.status,
            args.expiry,
            args.assets
          );
          await tx.wait();
          return curationId;
        }
      } finally {
        setLoading(false);
      }
    },
    [hubManagerInfo, contractRunner]
  );
  return { create, loading };
}

export function useCurationAddAssets() {
  const { hubManagerInfo, contractRunner } = useAssetHub();
  const [loading, setLoading] = useState(false);

  const addAssets = useCallback(
    async (curationId: bigint, assets: curation.CurationAssetStruct[]) => {
      if (assets.length === 0) {
        return;
      }
      setLoading(true);
      try {
        if (hubManagerInfo && contractRunner) {
          const curation = NewCuration(contractRunner, hubManagerInfo.curation);
          const tx = await curation.addAssets(curationId, assets);
          await tx.wait();
        }
      } finally {
        setLoading(false);
      }
    },
    [hubManagerInfo, contractRunner]
  );
  return { addAssets, loading };
}

export function useCurationRemoveAssets() {
  const { hubManagerInfo, contractRunner } = useAssetHub();
  const [loading, setLoading] = useState(false);

  const removeAssets = useCallback(
    async (curationId: bigint, assets: { hub: string; assetId: bigint }[]) => {
      setLoading(true);
      try {
        if (hubManagerInfo && contractRunner) {
          const hubs = assets.map((a) => a.hub);
          const assetIds = assets.map((a) => a.assetId);
          if (hubs.length === 0) {
            return;
          }
          const curation = NewCuration(contractRunner, hubManagerInfo.curation);
          const tx = await curation.removeAssets(curationId, hubs, assetIds);
          await tx.wait();
        }
      } finally {
        setLoading(false);
      }
    },
    [hubManagerInfo, contractRunner]
  );
  return { removeAssets, loading };
}

export function useCurationApproveAssets() {
  const { hubManagerInfo, contractRunner } = useAssetHub();
  const [loading, setLoading] = useState(false);

  const approveAssets = useCallback(
    async (
      curationId: bigint,
      assets: {
        hub: string;
        status: AssetApprovalStatus;
        assetId: bigint;
      }[]
    ) => {
      setLoading(true);
      try {
        if (hubManagerInfo && contractRunner) {
          const statuses = assets.map((a) => a.status);
          const assetIds = assets.map((a) => a.assetId);
          const hubs = assets.map((a) => a.hub);
          if (assets.length === 0) {
            return;
          }
          const curation = NewCuration(contractRunner, hubManagerInfo.curation);
          const tx = await curation.approveAssetBatch(
            curationId,
            hubs,
            assetIds,
            statuses
          );
          await tx.wait();
        }
      } finally {
        setLoading(false);
      }
    },
    [hubManagerInfo, contractRunner]
  );
  return { approveAssets, loading };
}
