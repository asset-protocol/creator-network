import { Asset } from '@creator-network/core';
import type QuillEditor from './QuillEditor';

export default function RichTextViewer({
  value,
  editor,
}: {
  value: Asset;
  editor: typeof QuillEditor;
}) {
  const Editor = editor;
  return (
    <Editor
      className="w-full"
      theme="snow"
      value={value.content}
      readOnly={true}
      modules={{ toolbar: false }}
    />
  );
}
