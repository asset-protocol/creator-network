import { forwardRef, useImperativeHandle, useMemo } from "react";
import { useAssetEditor } from "./AssetEditorContext";
import { IEditorProps } from "../../editor";
import { getAssetEditor } from "../../asset";

export type AssetContentEditorProps = {
  editorProps?: { [key: string]: any };
};

export function AssetMetadataEditor(props: AssetContentEditorProps) {
  const { type } = useAssetEditor();
  const editorProvider = useMemo(() => {
    if (type) {
      return getAssetEditor(type);
    }
  }, [type]);
  const Editor = useMemo(() => {
    if (editorProvider) {
      return forwardRef((refProps: IEditorProps, ref) => {
        const onSubmit = editorProvider!.useBeforePublish?.();
        useImperativeHandle(ref, () => ({
          onSubmit: onSubmit || ((v) => v),
        }));
        const EditorComponent = editorProvider!.editor;
        return <EditorComponent {...refProps} />;
      });
    }
  }, [editorProvider]);

  console.log(type, Editor);

  return Editor ? <Editor {...props.editorProps} /> : null;
}
