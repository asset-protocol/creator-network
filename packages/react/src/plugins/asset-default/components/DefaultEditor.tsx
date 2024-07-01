import { useAssetEditor } from "../../../asset/components/AssetEditor";

export default function ContentEditor() {
  const { content, setContent } = useAssetEditor();
  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}
