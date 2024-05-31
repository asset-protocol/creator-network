import { UserOutlined } from "@ant-design/icons";
import { useAssetHub } from "../../../context";
import { replaceUri } from "@creator-network/core";
import { Avatar } from "../../../ui";
import { AddressLink } from "../../../components";

export type AssetCardProps = {
  name: string;
  image?: string;
};

export function AssetCard(props: AssetCardProps) {
  const { account } = useAssetHub();
  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      <img
        src={replaceUri(props.image)}
        alt=""
        className="w-full object-cover aspect-[2/1]"
      />
      <div className="line-clamp-2 text-xl flex-1 px-4 py-1 font-bold">
        {props.name}
      </div>
      <div className="px-4 pt-4 text-lg">
        <Avatar
          className="mr-2 bg-[#87d068] w-[32px]"
          icon={replaceUri(account?.avatar) ?? <UserOutlined />}
        />
        <AddressLink address={account?.name ?? account?.address} />
      </div>
      <div className="mt-4"></div>
    </div>
  );
}
