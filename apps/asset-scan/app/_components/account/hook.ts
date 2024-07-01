'use client';
import { indexerClient } from '@/app/_creatornetwork';
import { useApp } from '../_layout/AppContext';
import { useEffect } from 'react';
import { SafeSigner } from './Safe';
import Safe from '@safe-global/protocol-kit';
import { Config, useConnectorClient } from 'wagmi';
import { AccountInfo, useAssetHub } from '@creator-network/react';
import { useEthersSigner } from '@/app/_creatornetwork/ether';
import { zeroAddress } from 'viem';

export function useCurrentStudio() {
  const { account, setAccount, setContractRunner, contractRunner } = useApp();
  const { data: client } = useConnectorClient<Config>();
  const signer = useEthersSigner();
  const { chain } = useAssetHub();

  const setFirstStudio = (account: AccountInfo, wallet: string) => {
    indexerClient()
      .assetHubs.fetchAssetHubs([wallet], 1)
      .then((studios) => {
        if (studios.length === 0) {
          localStorage.setItem(
            `userStudio.current.${account.address}`,
            zeroAddress
          );
          return;
        }
        setAccount({
          ...account,
          address: wallet,
          studio: studios[0].id,
          studioAvatar: studios[0].metadata?.image,
          studioName: studios[0].name,
        });
      });
  };

  const setCurretnStudio = async (
    account: AccountInfo,
    wallet: string,
    sutdio: string
  ) => {
    const res = await indexerClient().assetHubs.fetchById(sutdio);
    if (!res) {
      setFirstStudio(account, wallet);
      return;
    } else if (res.admin !== wallet) {
      console.warn('studio is owned not current wallet');
    } else {
      setAccount({
        ...account,
        address: wallet,
        studio: sutdio,
        studioAvatar: res.metadata?.image,
        studioName: res.name,
      });
    }
  };

  const setSafeSutdio = async (
    wallet: string,
    safeAddress: string,
    studio: string | null
  ) => {
    if (!client || !signer) {
      return;
    }
    const protocolKit = await Safe.init({
      provider: client!.transport,
      safeAddress: safeAddress,
    });
    const rn = new SafeSigner(protocolKit, chain.id, signer);
    setContractRunner(rn);
  };

  useEffect(() => {
    console.log('useCurrentStudio', account);
    if (account) {
      if (!account.studio) {
        const currentStudio = localStorage.getItem(
          `userStudio.current.${account.address}`
        );
        const isSafe =
          localStorage.getItem(`userStudio.type.${account.address}`) === 'safe';
        const safeAddress = localStorage.getItem(
          `userStudio.account.${account.address}`
        );
        let currentAccount = account.address;
        if (isSafe && safeAddress) {
          currentAccount = safeAddress;
          setSafeSutdio(account.address, safeAddress, currentStudio);
        }
        if (currentStudio) {
          setCurretnStudio(account, currentAccount, currentStudio);
        } else {
          setFirstStudio(account, currentAccount);
        }
      } else {
        localStorage.setItem(
          `userStudio.current.${account.address}`,
          account.studio
        );
      }
    }
  }, [account]);

  // useEffect(() => {
  //   if (!account) {
  //     return;
  //   }
  //   (async () => {
  //     if (contractRunner && contractRunner.isMulti) {
  //       localStorage.setItem(`userStudio.type.${account.address}`, 'safe');
  //       localStorage.setItem(
  //         `userStudio.account.${account.address}`,
  //         await contractRunner.getAddress()
  //       );
  //     } else {
  //       localStorage.removeItem(`userStudio.type.${account.address}`);
  //       localStorage.removeItem(`userStudio.account.${account.address}`);
  //     }
  //   })();
  // }, [contractRunner]);

  return { account };
}
