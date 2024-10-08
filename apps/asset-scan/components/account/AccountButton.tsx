'use client';

import { Avatar, Button, Divider, Menu } from 'antd';
import Popover from 'antd/es/popover';
import { ArrowLeft, Wallet } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useDisconnect } from 'wagmi';
import { AddressLink, formatAddress } from '../address/AddressLink';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { AccountSwitch } from './AccountSwitch';
import { useApp } from '../layout/AppContext';
import clsx from 'clsx';
import { replaceUri } from '@creator-network/core';
import { useCurrentStudio } from './hook';
import { useRouter } from 'next/navigation';

export function AccountContent({ onClose }: { onClose?: () => void }) {
  const { account } = useApp();
  const [subContent, setSubContent] = useState<ReactNode>();
  const { disconnect } = useDisconnect();
  const { push } = useRouter();
  return (
    <div className="w-[240px]">
      {subContent !== undefined && (
        <div className="flex flex-col">
          <Button
            type="text"
            icon={<ArrowLeft />}
            onClick={() => setSubContent(undefined)}
          />
          {subContent}
        </div>
      )}
      <div className={subContent ? 'hidden' : ''}>
        <div className="flex gap-2 text-sm items-center">
          <Avatar size={40} src={replaceUri(account?.studioAvatar)} />
          <div>
            <span>{account?.studioName}</span>
            <AddressLink
              address={account?.studio || account?.address}
              splitNum={6}
            />
            {!account?.studio && (
              <Button
                type="link"
                className="p-0 text-sm"
                onClick={() => setSubContent(<AccountSwitch />)}
              >
                选择工作室
              </Button>
            )}
          </div>
        </div>
        <Divider className="bg-gray-600 my-2" />
        <Menu
          items={[
            {
              type: 'submenu',
              key: 'switchAccount',
              label: '切换账号',
              onTitleClick: () => {
                setSubContent(<AccountSwitch />);
              },
              children: [],
            },
            {
              type: 'item',
              key: 'creator',
              label: '你的工作室',
              onClick: () => {
                push('/creator/studio');
                onClose?.();
              },
            },
            {
              key: 'disconnect',
              label: '断开连接',
              onClick: () => {
                disconnect();
                onClose?.();
              },
            },
          ]}
        ></Menu>
      </div>
    </div>
  );
}

export function LoginButton() {
  const { openConnectModal } = useConnectModal();
  return <Button onClick={() => openConnectModal?.()}>Connect Wallet</Button>;
}

export default function AccountButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { account } = useApp();
  useCurrentStudio();
  return (
    <div className="mr-4">
      {account ? (
        <Popover
          trigger={['click']}
          motion={{ motionName: '' }}
          overlayStyle={{ marginRight: '8px' }}
          content={<AccountContent onClose={() => setOpen(false)} />}
          open={open}
          placement="bottomLeft"
          onOpenChange={(v) => setOpen(v)}
          destroyTooltipOnHide
          className={clsx('px-0', className)}
          openClassName="px-0"
        >
          <div className="flex items-center gap-1 cursor-pointer">
            <Avatar
              size={32}
              shape="circle"
              src={replaceUri(account.studioAvatar)}
              icon={!account.studioAvatar && <Wallet />}
            />
            {/* <span>
              {formatAddress(account.studioName, 4, 2) ||
                formatAddress(account.address, 2, 4)}
            </span> */}
          </div>
        </Popover>
      ) : (
        <></>
      )}
      {!account ? <LoginButton /> : <></>}
    </div>
  );
}
