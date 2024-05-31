import { CollectModal } from "./CollectModal";
import { useState } from "react";
import { Asset } from '@creator-network/core'
import clsx from "clsx";

export type CollectButtonProps = {
  asset: Asset;
  requestLogin?: () => void;
  collectedCount?: number;
  multiCollect?: boolean;
  className?: string;
  onCollected?: (tokenId: bigint) => void;
};

export function CollectButton(props: CollectButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const collectedCount = props.collectedCount ?? 0;

  return (
    <div>
      <button
        className={clsx("btn btn-primary", props.className)}
        onClick={() => {
          setIsOpen(true);
        }}
        disabled={!props.multiCollect && collectedCount <= 0}
      >
        {collectedCount > 0 ? `Collected(${collectedCount})` : "Collect"}
      </button>
      <CollectModal
        open={isOpen}
        onCollected={(tokenId) => {
          setIsOpen(false);
          props.onCollected?.(tokenId);
        }}
        onClose={() => setIsOpen(false)}
        asset={props.asset}
      />
    </div>
  );
}
