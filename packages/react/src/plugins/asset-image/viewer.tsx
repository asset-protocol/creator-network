import { Suspense, lazy } from 'react';
import { TYPE_IMAGE } from './consts';
import { Asset } from '@creator-network/core';
import { AssetConfig } from "../../asset";

const ImageViewer = lazy(() => import('./components/ImageViewer'));

const imageViewer = (config: AssetConfig) => {
  config.registerViewer(TYPE_IMAGE, {
    selector: (v: Asset) => v.type === TYPE_IMAGE,
    viewer: (props) => (
      <Suspense>
        <ImageViewer {...props} />
      </Suspense>
    ),
  });
};
export default imageViewer;
