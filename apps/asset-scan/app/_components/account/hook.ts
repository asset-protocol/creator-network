'use client';
import { indexerClient } from '@/app/_creatornetwork';
import { useApp } from '../_layout/AppContext';
import { useEffect } from 'react';

export function useCurrentStudio() {
  const { account, setAccount } = useApp();

  const setFirstStudio = (wallet: string) => {
    indexerClient()
      .assetHubs.fetchAssetHubs([wallet], 1)
      .then((studios) => {
        if (studios.length === 0) {
          return;
        }
        setAccount({
          address: wallet,
          studio: studios[0].id,
          studioAvatar: studios[0].metadata?.image,
          studioName: studios[0].name,
        });
      });
  };

  const setCurretnStudio = async (wallet: string, sutdio: string) => {
    const res = await indexerClient().assetHubs.fetchById(sutdio);
    if (res.admin !== wallet) {
      console.warn('studio is owned not current wallet');
    } else {
      setAccount({
        address: wallet,
        studio: sutdio,
        studioAvatar: res.metadata?.image,
        studioName: res.name,
      });
    }
  };

  useEffect(() => {
    console.log('useCurrentStudio', account);
    if (account) {
      if (!account.studio) {
        const currentStudio = localStorage.getItem(
          `userStudio.current.${account.address}`
        );
        const isSafe = localStorage.getItem('userStudio.type') === 'safe';
        if (currentStudio) {
          setCurretnStudio(account.address, currentStudio);
        } else {
          setFirstStudio(account.address);
        }
      } else {
        localStorage.setItem(
          `userStudio.current.${account.address}`,
          account.studio
        );
      }
    }
  }, [account]);

  return { account };
}
