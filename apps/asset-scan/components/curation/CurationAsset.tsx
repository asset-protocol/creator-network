import { AssetApprovalStatus, Curation } from '@creator-network/indexer-js';
import Ribbon, { RibbonProps } from 'antd/es/badge/Ribbon';

export function CurationAssetRibbon({
  asset,
  children,
  placement,
  className,
}: {
  asset: Curation['assets'][0];
  children?: React.ReactNode;
  placement?: RibbonProps['placement'];
  className?: string;
}) {
  let props = { text: 'Approved', color: '#00AAA1' };
  switch (asset.status) {
    case AssetApprovalStatus.Approved:
      props = {
        text: 'Approved',
        color: 'green',
      };
      break;
    case AssetApprovalStatus.Pending:
      props = {
        text: 'Pending',
        color: '#9c9c9c',
      };
      break;
    case AssetApprovalStatus.Rejected:
      props = {
        text: 'Rejected',
        color: 'red',
      };
      break;
    default:
      break;
  }
  return (
    <Ribbon
      {...props}
      placement={placement}
      className={className}
    >
      {children}
    </Ribbon>
  );
}
