import {
  BrowserProvider,
  FallbackProvider,
  JsonRpcProvider,
  JsonRpcSigner,
} from 'ethers';
import { useMemo } from 'react';
import type { Account, Chain, Client, Transport } from 'viem';
import { type Config, useClient, useConnectorClient } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

export function createRpcClient() {
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });
  return publicClient;
}

export const publicEthProvider = clientToProvider(createRpcClient());

export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network)
    );
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const client = useClient<Config>({ chainId });
  return useMemo(
    () => clientToProvider(client as Client<Transport, Chain>),
    [client]
  );
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}
