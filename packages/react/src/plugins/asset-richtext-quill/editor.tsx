import { TYPE_RICH_TEXT } from './consts';
import { Delta } from 'quill/core';
import { configureAsset } from '../../asset';
import { useAssetHub } from '../../context';
import { getStorage } from '@creator-network/core';
import { Suspense, lazy } from 'react';

export const AssetRichTextEditor = lazy(
  () => import('./components/RichTextEditor')
);

const richtextEditor = () => {
  return configureAsset((config) => {
    return config.registerEditor({
      types: [{ value: TYPE_RICH_TEXT, label: 'Post' }],
      selector: (t) => t === TYPE_RICH_TEXT,
      editor: (props) => (
        <Suspense>
          <AssetRichTextEditor {...props} />
        </Suspense>
      ),
      useBeforePublish() {
        const { storage } = useAssetHub();
        return async (cur) => {
          const content = new Delta(JSON.parse(cur));
          for (const op of content.ops) {
            if (op.insert && typeof op.insert === 'object') {
              if (
                typeof op.insert.image === 'string' &&
                op.insert.image.startsWith('blob:')
              ) {
                const data = await fetch(op.insert.image).then((res) =>
                  res.blob()
                );
                const url = await getStorage(storage!)!.upload({ data });
                op.insert.image = url;
              }
              if (
                typeof op.insert.video === 'string' &&
                op.insert.video.startsWith('blob:')
              ) {
                const data = await fetch(op.insert.video).then((res) =>
                  res.blob()
                );
                const url = await getStorage(storage!)!.upload({ data });
                op.insert.video = url;
              }
              if (
                typeof op.insert.audio === 'string' &&
                op.insert.audio.startsWith('blob:')
              ) {
                const data = await fetch(op.insert.audio).then((res) =>
                  res.blob()
                );
                const url = await getStorage(storage!)!.upload({ data });
                op.insert.audio = url;
              }
            }
          }
          return JSON.stringify(content);
        };
      },
    });
  });
};

export default richtextEditor;
