import { TYPE_RICH_TEXT } from './consts';
import { IViewer, configureAsset } from '../../asset';
import { Asset } from '@creator-network/core';
import Viewer from './components/RichTextViewer';

const richtextViewer = ({ viewer }: { viewer: IViewer }) => {
  return configureAsset((config) => {
    return config.registerViewer(TYPE_RICH_TEXT, {
      selector: (v: Asset) => v.type === TYPE_RICH_TEXT,
      viewer: (props: any) => <Viewer editor={viewer} {...props} />,
    });
  });
};
export default richtextViewer;
