import { creatorNetwork } from "@creator-network/core";
import { useEffect } from "react";
import tokenCollectModulePlugin from "@creator-network/react/plugins/module-token-collect"

export function TokenCollectModule({
  tokenCollectModule,
}: {
  tokenCollectModule: string;
}) {
  useEffect(() => {
    if (tokenCollectModule) {
      return creatorNetwork.use(
        tokenCollectModulePlugin({
          moduleContract: tokenCollectModule,
          tokens: [
            {
              label: "TestToken",
              name: "TST",
              contract: "0x36536674237634Dd5e1F4C32804567F611e88602",
            },
          ],
        })
      );
    }
  }, [tokenCollectModule]);

  return null;
}
