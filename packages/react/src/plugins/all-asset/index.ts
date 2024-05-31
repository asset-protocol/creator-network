import defaultPlugin from '../asset-default';
import audioPlugin from '../asset-audio';
import externalLinkPlugin from '../asset-embed-video';
import imagePlugin from '../asset-image';
import markdownPlugin from '../asset-markdown';
import videoPlugin from '../asset-video';
import richTextQuillPlugin from '../asset-richtext-quill';
import { CreatorNetwork } from '@creator-network/core';

export const allAssetTypePlugin = (cn: CreatorNetwork) => {
  return cn.use(
    defaultPlugin(),
    audioPlugin(),
    externalLinkPlugin(),
    imagePlugin(),
    markdownPlugin(),
    videoPlugin(),
    richTextQuillPlugin()
  );
}

export default allAssetTypePlugin;

