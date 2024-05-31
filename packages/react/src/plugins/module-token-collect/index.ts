import { CollectModuleConfig, configureCollect } from '../../collect';
import { TokenCollectModule, TokenCollectModuleOptions } from './TokenCollectModule';

export default function tokenCollectModulePlugin(opts: TokenCollectModuleOptions) {
  return configureCollect((config: CollectModuleConfig) => {
    return config.registerCollectModule(TokenCollectModule(opts));
  });
}
export * from './TokenCollectModule';
export * from './components/TokenCollectModuleItem'