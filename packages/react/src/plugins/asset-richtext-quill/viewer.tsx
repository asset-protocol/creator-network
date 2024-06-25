import { Suspense, lazy, useEffect } from 'react';
import { TYPE_RICH_TEXT } from './consts';
import { configureAsset } from '../../asset';
import { Asset } from '@creator-network/core';
import { useAssetHub } from '../../context';

const Viewer = lazy(() => import('./components/RichTextViewer'));

const richtextViewer = () => {
  return configureAsset((config) => {
    return config.registerViewer(TYPE_RICH_TEXT, {
      selector: (v: Asset) => v.type === TYPE_RICH_TEXT,
      viewer: (props: any) => (
        <Suspense>
          <Viewer {...props} />
        </Suspense>
      ),
    });
  });
};
export default richtextViewer;
