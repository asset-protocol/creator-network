"use client"
import { Asset } from "@creator-network/core"
import { AssetEditorProvider, AssetMetadataEditor, useAssetEditor } from "@creator-network/react/asset/editor"
import { TYPE_RICH_TEXT } from "@creator-network/react/plugins/asset-richtext"
import { Button, Image, Popover, Select } from "antd"
import { selectFile } from "@creator-network/react/utils"
import { AssetPublishForm } from "./AssetPublishModal"
import { useEffect, useState } from "react"
import { useAssetTypes } from "@creator-network/react/hooks"
import { useAssetHub } from "@creator-network/react"
import { useAccountModal } from "@rainbow-me/rainbowkit"

export type AssetEditorProps = {
  asset?: Asset
}

export function AssetEditor(props: AssetEditorProps) {
  const { account, requireLogin } = useAssetHub();
  useEffect(() => {
    if (!account) {
      requireLogin?.();
    }
  }, [])
  return (
    <AssetEditorProvider defaultType={TYPE_RICH_TEXT} {...props}>
      <div className="mt-8">
        <AssetEditorHeader />
        <AssetConentEditor />
      </div>
    </AssetEditorProvider>
  )
}

export function AssetEditorHeader() {
  const { type, setType, metadata, content } = useAssetEditor();
  const [open, setOpen] = useState(false);
  const { account, requireLogin } = useAssetHub();

  const assetTypes = useAssetTypes()();

  const canPublish = metadata && metadata.name && content && account?.channel;
  return <div className="flex justify-end items-center gap-4">
    <Select
      options={assetTypes}
      value={type}
      onChange={e => setType(e)}
      className="w-[120px]"
      size="large"
    />
    <Popover
      content={<AssetPublishForm onClose={() => setOpen(false)} />}
      className="w-[max-content]"
      trigger="click"
      open={open}
    >
      <Button
        size="large"
        type="primary"
        disabled={!canPublish}
        onClick={() => {
          if (!account?.address) {
            requireLogin?.();
          } else {
            setOpen(true);
          }
        }}>
        Publish
      </Button>
    </Popover>
  </div>
}

export function AssetConentEditor() {
  const { metadata, setMetadata } = useAssetEditor();
  return (
    <div className="flex-1 min-w-[600px]">
      <input
        type="text"
        placeholder="Type post title"
        value={metadata?.name}
        className="input w-full border-0 border-b-[1px] border-gray-300 py-4 text-3xl font-bold focus:outline-none rounded-none h-[unset]"
        onChange={e => { setMetadata({ ...metadata, name: e.target.value }) }}
      />
      <AssetMetadataEditor editorProps={{ placeholder: "输入文章内容..." }} />
    </div>
  )
}

export function AssetInfoEditor() {
  const { metadata, setMetadata, publishedAssetId } = useAssetEditor();

  const handleClick = async () => {
    const f = await selectFile("image/*");
    if (f) {
      setMetadata({ ...metadata!, image: URL.createObjectURL(f) })
    }
  }

  return (
    <div className="w-[320px] flex flex-col gap-4">
      <div className="rounded-lg aspect-[2/1] w-full overflow-hidden text-base" onClick={handleClick}>
        {!(metadata?.image) && <div className="w-full h-full btn">Select cover</div>}
        {metadata?.image && <Image preview={false} src={metadata?.image} className="w-full h-full" />}
      </div>
      {/* <textarea className="textarea textarea-bordered w-full mt-4" placeholder="Input description"></textarea> */}
    </div>
  )
}