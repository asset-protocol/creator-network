import { Asset } from "@creator-network/core";
import QuillEditor from "./QuillEditor";

export default function RichTextViewer({ value }: { value: Asset }) {
  return (
    <QuillEditor
      className="w-full"
      theme="snow"
      value={value.content}
      readOnly={true}
      modules={{ toolbar: false }}
    />
  );
}
