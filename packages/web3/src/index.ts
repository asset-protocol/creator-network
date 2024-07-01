import { Addressable, Contract, ContractRunner } from 'ethers';
import {
  CurationAbi,
  IERC20Abi,
  TokenGlobalModuleAbi,
  assethubAbi,
  assethubManagerAbi,
} from './abi/abi';
import { AssetHub } from './abi/AssetHub';
import { AssetHubManager as AssetHubManager } from './abi/AssetHubManager';
import { IERC20 } from './abi/IERC20';
import { TokenGlobalModule } from './abi/TokenGlobalModule';
import { Curation } from './abi/Curation';

export type { PayableOverrides } from './abi/common';
export * as assethub from './abi/AssetHub';
export * from './abi/AssetHubManager';
export * as tokenGlobalModule from './abi/TokenGlobalModule';
export * as erc20 from './abi/IERC20';
export * as curation from './abi/Curation';

export function NewAssetHub(signer: ContractRunner, hub: string | Addressable) {
  const ct = new Contract(hub, assethubAbi, signer) as unknown;
  return ct as AssetHub;
}

export function NewAssetHubManager(
  signer: ContractRunner,
  manager: string | Addressable
) {
  console.log('manager address', manager);
  const ct = new Contract(manager, assethubManagerAbi, signer) as unknown;
  return ct as AssetHubManager;
}

export function NewERC20(signer: ContractRunner, addr: string) {
  const ct = new Contract(addr, IERC20Abi, signer) as unknown;
  return ct as IERC20;
}
export function NewTokenGlobalModule(signer: ContractRunner, addr: string) {
  const ct = new Contract(addr, TokenGlobalModuleAbi, signer) as unknown;
  return ct as TokenGlobalModule;
}

export function NewCuration(signer: ContractRunner, addr: string) {
  const ct = new Contract(addr, CurationAbi, signer) as unknown;
  return ct as Curation;
}
