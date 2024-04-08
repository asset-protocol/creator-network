import { FeeCollectModulePlugin, useAssetHub } from "@repo/ui/asset";
import { useEffect } from "react";

export function FeeCollectModule() {
  const { ctx, hubInfo } = useAssetHub();

  useEffect(() => {
    if (hubInfo?.feeCollectModule) {
      ctx.use(FeeCollectModulePlugin(hubInfo.feeCollectModule));
    }
  }, [ctx, hubInfo]);

  return null;
}
