import { Suspense, lazy } from 'react';
import { TYPE_MARKDOWN } from './consts';
import { useAssetHub } from '../../context';
import { getStorage } from '@creator-network/core';
import { AssetConfig } from '../../asset';

const Editor = lazy(() => import('./components/MarkdownEditor'));

const markdownEditor = (config: AssetConfig) => {
  config.registerEditor({
    types: [{ value: TYPE_MARKDOWN, label: 'Markdown' }],
    selector: (t) => t === TYPE_MARKDOWN,
    editor: (props) => (
      <Suspense>
        <Editor {...props} />
      </Suspense>
    ),
    useBeforePublish: () => {
      const { storage } = useAssetHub();
      return async (cur: string) => {
        let res = cur;
        const linkReg = /(\(blob:http:\/\/localhost:.*\))/g;
        const links = cur.matchAll(linkReg);
        if (links) {
          for (const l of links) {
            try {
              const blobUrl = l[0].replace('(', '').replace(')', '');
              const data = await fetch(blobUrl).then((b) => b.blob());
              const url = await getStorage(storage!)!.upload({ data });
              res = res.replace(blobUrl, url);
            } catch (e: unknown) {
              console.warn(e);
            }
          }
        }
        return res;
      };
    },
  });
};
export default markdownEditor;
