'use client';
import { indexerClient } from '@/creatornetwork';
import { useApp } from '../_layout/AppContext';
import { useEffect } from 'react';
import { SafeSigner } from './Safe';
import Safe from '@safe-global/protocol-kit';
import { Config, useAccount, useConnectorClient } from 'wagmi';
import { AccountInfo, useAssetHub } from '@creator-network/react';
import { useEthersSigner } from '@/creatornetwork/ether';
import { zeroAddress } from 'viem';
import SafeApiKit from '@safe-global/api-kit';

export function useCurrentStudio() {
  const { account, setAccount, setContractRunner } = useApp();
  const signer = useEthersSigner();
  const { chain } = useAssetHub();
  const { address: wallet } = useAccount();
  const { data: client } = useConnectorClient<Config>();
  useSafe();

  const setFirstStudio = async (address: string) => {
    const studios = await indexerClient().assetHubs.fetchAssetHubs(
      [address],
      1
    );
    if (studios.length === 0) {
      return {
        studio: zeroAddress,
        studioAvatar: undefined,
        studioName: undefined,
      };
    } else {
      return {
        studio: studios[0].id,
        studioAvatar: studios[0].metadata?.image,
        studioName: studios[0].name,
      };
    }
  };

  const setCurrentStudio = async (address: string, sutdio: string) => {
    const res = await indexerClient().assetHubs.fetchByNameOrId(sutdio);
    if (!res || res.admin !== address) {
      return setFirstStudio(address);
    } else {
      return {
        studio: sutdio,
        studioAvatar: res.metadata?.image,
        studioName: res.name,
      };
    }
  };

  const checkSafe = async () => {
    if (wallet) {
      const isSafe = localStorage.getItem(`${wallet}.account.type`) === 'safe';
      if (isSafe) {
        const safeAddr = localStorage.getItem(`${wallet}.account.safe`);
        if (!client || !signer || !safeAddr) {
          return;
        }
        if (safeAddr === account?.address) {
          // 防止重复初始化
          return;
        }
        const protocolKit = await Safe.init({
          provider: client.transport,
          safeAddress: safeAddr,
        });
        const apiKit = new SafeApiKit({
          chainId: BigInt(chain.id), // set the correct chainId
        });
        const res = await apiKit.getSafesByOwner(wallet);
        if (res.safes.indexOf(safeAddr) === -1) {
          return;
        }
        const rn = new SafeSigner(protocolKit, chain.id, signer);
        setContractRunner(rn);
        return safeAddr;
      }
    }
  };

  const initStudio = async () => {
    console.log('account', account);
    if (account) {
      //钱包登录
      if (!account.studio) {
        // 没有设置过studio
        const currentStudio = localStorage.getItem(
          `${account.address}.userStudio.current`
        );
        let currentAccount = await checkSafe();
        const isSafe = !!currentAccount;
        console.log('safe, wallet', currentAccount, wallet);
        if (!currentAccount) {
          currentAccount = account.address;
        }
        let acc;
        if (currentStudio) {
          acc = await setCurrentStudio(currentAccount, currentStudio);
        } else {
          acc = await setFirstStudio(currentAccount);
        }
        setAccount({
          address: currentAccount,
          isSafe: isSafe,
          ...acc,
        });
      } else {
        if (account.studio === zeroAddress) {
          localStorage.removeItem(`${account.address}.userStudio.current`);
        } else {
          localStorage.setItem(
            `${account.address}.userStudio.current`,
            account.studio
          );
        }
      }
    }
  };

  useEffect(() => {
    if (account && signer) {
      initStudio();
    }
  }, [account, signer]);

  return { account };
}

export function useSafe() {
  const walletAccount = useAccount();
  const signer = useEthersSigner();
  const { chain } = useAssetHub();
  const { setContractRunner, setAccount, account } = useApp();
  const { data: client } = useConnectorClient<Config>();

  useEffect(() => {
    if (account?.isSafe) {
      localStorage.setItem(`${walletAccount.address}.account.type`, 'safe');
      localStorage.setItem(
        `${walletAccount.address}.account.safe`,
        account.address
      );
      return () => {
        localStorage.removeItem(`${walletAccount.address}.account.type`);
        localStorage.removeItem(`${walletAccount.address}.account.safe`);
      };
    }
  }, [account]);
}
