'use client'
import { Button } from "antd"
import { CollectModal } from "./CollectModal"
import { useState } from "react";
import { Asset } from "@creator-network/core";
import { User } from "lucide-react";
import clsx from "clsx";

export type MintButtonType = {
  asset: Asset;
  className?: string;
  onCollected?: (assetId: bigint) => void;
}

export function MintButton(props: MintButtonType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        className={clsx("flex items-center px-2", props.className)}
        onClick={() => setIsOpen(true)}
      >
        Mint
        <User size={14} className="ml-2" />
        <span className="text-sm">{props.asset.collectCount?.toString() ?? "-"}</span>
      </Button>
      <CollectModal
        open={isOpen}
        maskClosable={false}
        onCollected={(tokenId) => {
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
        asset={props.asset} />
    </>
  )
}