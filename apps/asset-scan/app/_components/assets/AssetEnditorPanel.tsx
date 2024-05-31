import { AssetPublishModal } from "./AssetPublishModal";
import { useAssetEditor } from "../../../../../packages/react/src/asset/components/_AssetEditor/AssetEditorContext";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useAssetTypes } from "@creator-network/react/hooks";
import { useAssetHub } from "../../../../../packages/react/src/context";
import { Button, Select } from "@creator-network/react/ui";

export function AssetEditorPanel(props: {
  onPublished?: (hub: string, assetId: bigint) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const getAssetTypes = useAssetTypes();
  const assetTypeOptions = getAssetTypes();
  const { type, setType, content, metadata, publishedAssetId, hub } =
    useAssetEditor();
  const { account, requireLogin } = useAssetHub();

  const canPublish = useMemo(() => {
    return content && metadata?.name && metadata?.image;
  }, [content, metadata]);

  useEffect(() => {
    if (publishedAssetId) {
      setOpen(false);
      props.onPublished?.(hub!, publishedAssetId);
    }
  }, [publishedAssetId]);

  return (
    <div
      className={clsx(
        "flex items-center justify-end gap-4 px-2 bg-[#ffffff99] py-4 backdrop-blur-lg",
        props.className
      )}
    >
      <Select
        className="w-[160px]"
        value={type}
        options={assetTypeOptions}
        onChange={e => setType(e.target.value)}
      ></Select>
      <Button
        disabled={!canPublish}
        onClick={() => {
          if (account) {
            setOpen(true);
          } else {
            requireLogin?.();
          }
        }}
      >
        Publish
      </Button>
      <AssetPublishModal open={open} onCancel={() => setOpen(false)} />
    </div>
  );
}
