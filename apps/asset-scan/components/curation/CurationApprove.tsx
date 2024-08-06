'use client';
import { Asset, replaceUri } from '@creator-network/core';
import { AssetApprovalStatus, Curation } from '@creator-network/indexer-js';
import {
  Checkbox,
  CheckboxProps,
  Divider,
  Dropdown,
  List,
  MenuProps,
} from 'antd';
import { useEffect, useState } from 'react';
import { useCurationApproveAssets } from '@creator-network/react/hooks';
import { indexerClient } from '@/creatornetwork';
import { useAssetHub } from '@creator-network/react';
import Image from 'next/image';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import Link from 'next/link';
import { StudioAvatar } from '../studio/StudioAvatar';
import { revalidateAllCurations } from '@/app/creator/curation/create/actions';
import { CurationAssetRibbon } from './CurationAsset';

export function CurationApprove() {
  const [curations, setCurations] = useState<Curation[]>([]);

  const { account } = useAssetHub();
  const handleApprove = async (status: AssetApprovalStatus) => {
    await revalidateAllCurations();
    await fetchCurations();
  };
  const fetchCurations = async () => {
    if (!account?.studio) {
      setCurations([]);
      return;
    }
    const curations = await indexerClient().curations.fetchCurationAssets(
      account?.studio,
      undefined
    );
    setCurations(curations);
  };
  useEffect(() => {
    fetchCurations();
  }, [account]);
  return (
    <div>
      <List
        dataSource={curations}
        split
        renderItem={(item) => (
          <CurationApproveItem
            key={item.id}
            curation={item}
            onApprove={handleApprove}
          />
        )}
      />
    </div>
  );
}

export function ApproveAssetButton({
  curationId,
  assets,
  disabeld,
  size,
  onApprove,
}: {
  curationId: bigint;
  assets: Asset[];
  disabeld?: boolean;
  size?: SizeType;
  onApprove?: (status: AssetApprovalStatus) => void;
}) {
  const { approveAssets, loading } = useCurationApproveAssets();
  const handleApprove = async (status: AssetApprovalStatus) => {
    const assetsInput = assets.map((a) => ({
      hub: a.hub.id,
      assetId: BigInt(a.assetId),
      status,
    }));
    await approveAssets(curationId, assetsInput);
    onApprove?.(status);
  };
  const menuProps: MenuProps = {
    items: [
      {
        label: 'Reject Asset',
        key: 'reject',
        danger: true,
        onClick: () => handleApprove(AssetApprovalStatus.Rejected),
      },
    ],
  };
  return (
    <Dropdown.Button
      disabled={disabeld}
      loading={loading}
      menu={menuProps}
      size={size}
      onClick={() => handleApprove(AssetApprovalStatus.Approved)}
    >
      Approve
    </Dropdown.Button>
  );
}

export function CurationApproveItem({
  curation,
  onApprove,
}: {
  curation: Curation;
  onApprove?: (status: AssetApprovalStatus) => void;
}) {
  const [checkedList, setCheckedList] = useState<Asset[]>([]);

  const checkAll = curation.assets.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < curation.assets.length;

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? curation.assets.map((a) => a.asset) : []);
  };

  const onChange = (asset: Asset, checked: boolean) => {
    if (checked) {
      setCheckedList([...checkedList, asset]);
    } else {
      setCheckedList(checkedList.filter((a) => a.id !== asset.id));
    }
  };
  return (
    <div className="max-w-[920px]">
      <div className="flex items-center flex-wrap">
        <div className="flex-1 flex items-start">
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          ></Checkbox>
          <div className="ml-2">
            <div className="flex gap-2 items-end ">
              <Link className="flex-shrink" href={`/curation/${curation.id}`}>
                <span>{curation.name}</span>
              </Link>
              <StudioAvatar
                className="text-sm text-gray-500 flex-shrink-0"
                avatarSize={16}
                hub={curation.hub}
              />
            </div>

            <div className="text-xs mt-1 text-gray-400 flex gap-2 items-center">
              {curation.description ?? '暂无描述'}
            </div>
          </div>
        </div>
        <div>
          <ApproveAssetButton
            size="middle"
            disabeld={checkedList.length === 0}
            curationId={BigInt(curation.tokenId)}
            assets={checkedList}
            onApprove={onApprove}
          />
        </div>
      </div>
      <Divider className="my-2 bg-gray-800" />
      <div className="flex flex-col">
        {curation.assets.map((a) => (
          <div className="flex items-center ml-2 gap-2  p-2 rounded-lg hover:bg-gray-100 py-4">
            <Checkbox
              className="mr-2"
              key={a.asset.id}
              onChange={(e) => onChange(a.asset, e.target.checked)}
              checked={checkedList.includes(a.asset)}
            ></Checkbox>
            <div className="flex-1">
              <CurationAssetRibbon key={a.asset.id} asset={a} placement="start">
                <div className="flex gap-2 flex-1">
                  <Link href={`/a/${a.asset.id}`} target="_blank">
                    <Image
                      src={replaceUri(a.asset.image) ?? ''}
                      width={140}
                      height={70}
                      alt={a.asset.name}
                      className="aspect-[2/1] rounded-lg object-cover"
                    />
                  </Link>
                  <div className="flex flex-col flex-1">
                    <Link href={`/a/${a.asset.id}`} target="_blank">
                      <div className="text-lg line-clamp-2 font-semibold">
                        {a.asset.name}
                      </div>
                    </Link>
                    <div className="flex-1 text-lg line-clamp-2">
                      {a.asset.description}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">
                        {'#' + a.asset.assetId.toString()}
                      </span>
                      <span className="text-gray-500">
                        {new Date(
                          Number.parseInt(a.asset.timestamp)
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CurationAssetRibbon>
            </div>
            <div className="">
              <ApproveAssetButton
                curationId={BigInt(curation.tokenId)}
                assets={[a.asset]}
                size="small"
                onApprove={onApprove}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
