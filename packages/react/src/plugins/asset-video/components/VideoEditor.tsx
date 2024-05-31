import { useAssetEditor } from "../../../asset";
import { VideoBlobUpload } from "../../../ui";

export default function VideoEditor() {
  const { content, setContent } = useAssetEditor();
  return (
    <>
      <VideoBlobUpload
        accept="video/*,.mkv"
        value={content}
        onChange={(v) => setContent(v)}
      ></VideoBlobUpload>
    </>
  );
}
