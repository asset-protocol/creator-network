import { useRef } from 'react';
import { selectFile } from '../../../utils/file';
import type Quill from 'quill';
import { useAssetEditor } from '../../../asset/components/AssetEditor';
import type QuillEditor from './QuillEditor';
export type RichTextEditorProps = {
  editor: typeof QuillEditor;
  className?: string;
  [key: string]: any;
};

const AssetRichTextEditor = (props: RichTextEditorProps) => {
  const { content, setContent } = useAssetEditor();
  const editor = useRef<Quill>(null);
  const QEditor = props.editor;
  return (
    <div className="border-[1px] border-solid border-gray-300">
      {/* <AssetEditorHeader descriptonPlaceholder="Input Summary" /> */}
      <div className="px-4">
        <QEditor
          {...props}
          ref={editor}
          modules={{
            toolbar: {
              container: [
                [{ font: [] }, { size: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ script: 'super' }, { script: 'sub' }],
                [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
                [
                  { list: 'ordered' },
                  { list: 'bullet' },
                  { indent: '-1' },
                  { indent: '+1' },
                ],
                [{ direction: 'rtl' }, { align: [] }],
                ['link', 'image', 'video', 'formula'],
                ['clean'],
              ],
              handlers: {
                image: () => {
                  selectFile('image/*').then((file) => {
                    if (file) {
                      const blobURL = URL.createObjectURL(file);
                      editor.current?.format('image', blobURL);
                    }
                  });
                },
                video: () => {
                  selectFile('video/*,.mov,.mkv').then((file) => {
                    if (file) {
                      const blobURL = URL.createObjectURL(file);
                      editor.current?.format('video', blobURL);
                    }
                  });
                },
              },
            },
          }}
          theme="snow"
          value={content}
          onChange={(v) => {
            setContent(v);
          }}
          className="min-h-[600px]"
        ></QEditor>
      </div>
    </div>
  );
};

export default AssetRichTextEditor;
