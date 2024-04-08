import Button from "antd/es/button";
import { AssetsDynamicsType } from "./index.type";
import { getShortAddress } from "../../lib/format";
import dayjs from "dayjs";
import { Asset } from "../..";
import Paragraph from "antd/es/typography/Paragraph";

type ItemUpdateProps = {
  asset: AssetsDynamicsType
  showV2Button?: boolean
  onClick?: (val: Asset) => void
}

/**
 * display the asset dynamics modified by the user
 * @param param 
 * @returns 
 */
export function ItemUpdate(props: ItemUpdateProps) {
  const { showV2Button, asset, onClick } = props
  return (
    <div className="tr frc-between whitespace-nowrap px-4 border border-1">
      <div className="flex-1">
        <Paragraph copyable>{getShortAddress(asset.hash)}</Paragraph>
      </div>
      <div className="flex-1">
        <Paragraph copyable>{getShortAddress(asset.publisher)}</Paragraph>
      </div>
      <div className="flex-1">AR</div>
      <div className="flex-1">{dayjs(parseInt(asset.lastUpdatedAt, 10)).format('YYYY-MM-DD hh:mm:ss')}</div>
      <div className="flex-1 frc-center">
        <Button type="link" disabled={!showV2Button} onClick={() => onClick?.(JSON.parse(asset.content))}>原版本</Button>
        <Button type="link" disabled={!showV2Button} onClick={() => onClick?.(JSON.parse(asset.content))}>修改版本</Button>
      </div>
    </div>
  );
}