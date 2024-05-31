import { useAssetEditor } from "../../../asset/components/_AssetEditor/AssetEditorContext";

export default function ExternalLinkEditor() {
  const { content, setContent } = useAssetEditor();
  return (
    <input type="text" className="input input-bordered w-full max-w-xs" value={content} onChange={(e) => setContent(e.target.value)} />
  );
}
