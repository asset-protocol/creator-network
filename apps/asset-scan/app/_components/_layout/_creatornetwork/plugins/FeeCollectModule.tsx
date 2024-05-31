import { creatorNetwork } from "@creator-network/core";
import { useEffect } from "react";
import feeCollectModulePlugin from "@creator-network/react/plugins/module-fee-collect";

export function FeeCollectModule({
  feeCollectModule,
}: {
  feeCollectModule: string;
}) {
  useEffect(() => {
    if (feeCollectModule) {
      return creatorNetwork.use(feeCollectModulePlugin(feeCollectModule));
    }
  }, [feeCollectModule]);

  return null;
}
