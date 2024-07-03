import {
  AddressLink,
  Asset,
  AssetApprovalStatusType,
  Curation,
  replaceUri,
  useCurationApproveAssets,
  useGetCurationAssets,
} from "@repo/ui/asset";
import {
  Checkbox,
  CheckboxProps,
  Divider,
  Dropdown,
  List,
  MenuProps,
  Image,
} from "antd";
import { useState } from "react";

export function CurationApprove({ account }: { account: string }) {
  const { data, loading } = useGetCurationAssets(account, "Pending");

  return (
    <div>
      <h1>Curation Approve</h1>
      <List
        loading={loading}
        dataSource={data}
        renderItem={(item) => (
          <CurationApproveItem key={item.id} curation={item} />
        )}
      />
    </div>
  );
}

export function ApproveAssetButton({
  curationId,
  assets,
  disabeld,
}: {
  curationId: bigint;
  assets: { assetId: bigint; hub: string }[];
  disabeld?: boolean;
}) {
  const { approveAssets, loading } = useCurationApproveAssets();
  const handleApprove = async (status: AssetApprovalStatusType) => {
    const assetsInput = assets.map((a) => ({ ...a, status }));
    await approveAssets(curationId, assetsInput);
  };
  const menuProps: MenuProps = {
    items: [
      {
        label: "Reject Asset",
        key: "reject",
        danger: true,
        onClick: () => handleApprove(AssetApprovalStatusType.Rejected),
      },
    ],
  };
  return (
    <Dropdown.Button
      disabled={disabeld}
      loading={loading}
      menu={menuProps}
      onClick={() => handleApprove(AssetApprovalStatusType.Approved)}
    >
      Approve
    </Dropdown.Button>
  );
}

export function CurationApproveItem({ curation }: { curation: Curation }) {
  const [checkedList, setCheckedList] = useState<Asset[]>([]);

  const checkAll = curation.assets.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < curation.assets.length;

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
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
    <div>
      <div className="flex items-center flex-wrap">
        <div className="flex-1">
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            <span className="font-bold">{curation.name}</span>
          </Checkbox>
        </div>
        <div>
          <ApproveAssetButton
            disabeld={checkedList.length === 0}
            curationId={BigInt(curation.id)}
            assets={checkedList}
          />
        </div>
      </div>
      <Divider className="my-2" />
      <div className="flex flex-col gap-2">
        {curation.assets.map((a) => (
          <div className="flex items-center ml-4 gap-2">
            <Checkbox
              key={a.asset.id}
              onChange={(e) => onChange(a.asset, e.target.checked)}
              checked={checkedList.includes(a.asset)}
            ></Checkbox>
            <div className="flex gap-2 flex-1">
              <Image
                src={replaceUri(a.asset.image)}
                width={160}
                alt={a.asset.name}
                className="aspect-ratio-1/2 w-10"
              />
              <div className="flex flex-col flex-1">
                <div className="text-lg line-clamp-1">{a.asset.name}</div>
                <div className="flex-1 text-lg line-clamp-2">
                  {a.asset.description}
                </div>
                <div className="flex items-center">
                  <AddressLink
                    address={a.asset.hub}
                    className="mr-1"
                  ></AddressLink>
                  #
                  <span className="font-bold">
                    {a.asset.assetId.toString()}
                  </span>
                  <span className="ml-4">{a.asset.type}</span>
                </div>
              </div>
            </div>
            <div>
              <ApproveAssetButton
                curationId={BigInt(curation.id)}
                assets={[a.asset]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
