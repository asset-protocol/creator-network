'use client'
import { Divider, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Asset, AssetHubInfo } from "@creator-network/core";
import { AssetList } from "../_components/assets";
import { useGetAssetHubs } from "@creator-network/indexer-js";
import { useGoAsset, useGoHub } from "./_navigate";
import { AppProviders } from "../_components/_layout/AppRoot";

const home = function Home({ params }: { params: { hub: string } }) {
  const hub = params.hub;
  const [hubInfo, setHubInfo] = useState<AssetHubInfo>();
  const { data, loading } = useGetAssetHubs();
  const { goViewer } = useGoAsset();
  const { goHub } = useGoHub();

  const hubOptions = useMemo(() => data?.map((hub) => ({ label: hub.name, value: hub.id })), [data])
  useEffect(() => {
    if (data) {
      if (!hubInfo) {
        if (hub === "home") {
          setHubInfo(data[0]);
        } else {
          setHubInfo(data.find((h) => h.id === hub || h.name === hub));
        }
      } else if (hub !== "home" && hubInfo.id !== hub && hubInfo.name !== hub) {
        setHubInfo(data.find((h) => h.id === hub || h.name === hub));
      }
    }
  }, [data, hub]);

  const hanldeClickAsset = (asset: Asset) => {
    goViewer(asset.hub, asset.assetId.toString());
  };

  if (loading) {
    return (
      <div className="pt-6">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AppProviders>
      <div className="max-w-[1080px] mx-auto flex flex-col gap-3 m-auto pt-6">
        <div>
          All AssetHubs:
          <Select
            className="ml-4 w-[200px]"
            options={hubOptions}
            onChange={(value) => {
              const hub = hubOptions?.find((h) => h.value === value);
              if (hub) {
                goHub(hub.value);
              }
            }}
          ></Select>
        </div>
        <Divider className="my-2 bg-gray-300" />
        {/* <div>TestToken: {TestToken}</div> */}
        <div>AssetHub Name: {hubInfo?.name}</div>
        <div>AssetHub: {hubInfo?.id}</div>
        <div>AssetHub Admin: {hubInfo?.admin}</div>
        <div>AssetHub Version: {hubInfo?.version}</div>
        <div>
          AssetHub CreateTime:{" "}
          {hubInfo?.timestamp
            ? new Date(Number.parseInt(hubInfo.timestamp.toString())).toString()
            : ""}
        </div>
        <div>NftGatedModule: {hubInfo?.nftGatedModule}</div>
        <Divider className="my-2 bg-gray-300" />
        Assets List:
        {hubInfo?.id && (
          <AssetList
            query={{
              hub: hubInfo.id,
              first: 9999,
              fetchPolicy: "no-cache",
              orderBy: ["timestamp_DESC"],
              skipFunc: (args) => !args.hub,
            }}
            grid={{ column: 4, gutter: 12, xs: 2, sm: 3 }}
            onAssetClick={hanldeClickAsset}
          ></AssetList>
        )}
      </div>
    </AppProviders>
  );
}
export default home;
