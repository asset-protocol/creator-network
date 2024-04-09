import Button from "antd/es/button";
import { AssetsDynamicsType } from "./index.type";
import { getShortAddress } from "../../lib/format";
import dayjs from "dayjs";
import Paragraph from "antd/es/typography/Paragraph";

type ItemUpdateProps = {
  timestamp: string
  asset: AssetsDynamicsType
  showV2Button?: boolean
  onClick?: () => void
  onClick2?: () => void
}

/**
 * display the asset dynamics modified by the user
 * @param param 
 * @returns 
 */
export function ItemUpdate(props: ItemUpdateProps) {
  const { showV2Button, timestamp, asset, onClick, onClick2 } = props
  return (
    <div className="tr frc-between whitespace-nowrap px-4 border border-1">
      <div className="flex-1">
        <Paragraph copyable>{getShortAddress(asset.hash)}</Paragraph>
      </div>
      <div className="flex-1">
        <Paragraph copyable>{getShortAddress(asset.publisher)}</Paragraph>
      </div>
      <div className="flex-1 mb-4">AR</div>
      <div className="flex-1 mb-4">{dayjs(parseInt(timestamp, 10)).format('YYYY-MM-DD hh:mm:ss')}</div>
      <div className="flex-1 frc-center mb-4">
        <Button type="link" disabled={!showV2Button} onClick={() => onClick?.()}>原版本</Button>
        <Button type="link" disabled={!showV2Button} onClick={() => onClick2?.()}>修改版本</Button>
      </div>
    </div>
  );
}