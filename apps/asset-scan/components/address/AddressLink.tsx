'use client';
import { getStorage, replaceUri } from '@creator-network/core';
import { useAssetHub } from '@creator-network/react';
import { message } from 'antd';
import clsx from 'clsx';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent, ReactNode } from 'react';
import { usePublicClient } from 'wagmi';

export type AddressLinkProps = {
  herf?: string;
  splitNum?: number;
  splitNum2?: number;
  address?: string;
  children?: ReactNode;
  iconClassName?: string;
  className?: string;
  hideCopy?: boolean;
};
export function AddressLink(props: AddressLinkProps) {
  const client = usePublicClient();

  const handleCopy = async (e: MouseEvent) => {
    e.preventDefault();
    if (props.address) {
      await navigator.clipboard.writeText(props.address);
      message.success('复制成功');
    }
  };

  const addressURl = () => {
    const url = client?.chain.blockExplorers?.default.url;
    if (url) {
      return `${url}/address/${props.address}`;
    }
    return '';
  };

  return (
    <div className={clsx('flex gap-2 items-center', props.className)}>
      <Link
        className="flex"
        href={props.herf ?? addressURl()}
        target="_blank"
        title={props.address}
      >
        {props.children
          ? props.children
          : formatAddress(props.address, props.splitNum, props.splitNum2)}
      </Link>
      {!props.hideCopy && (
        <Copy
          className={clsx('text-gray-400 cursor-pointer', props.iconClassName)}
          size={16}
          onClick={handleCopy}
        />
      )}
    </div>
  );
}

export function TxLink(props: AddressLinkProps) {
  const client = usePublicClient();
  const baseUrl = client?.chain.blockExplorers?.default.url;
  let href: string | undefined = undefined;
  if (baseUrl) {
    href = `${baseUrl}/tx/${props.address}`;
  }
  return <AddressLink {...props} herf={href} />;
}

export function BlobLink(props: AddressLinkProps) {
  let href: string | undefined = undefined;
  href = replaceUri(props.address);
  if (href === props.address) {
    href = undefined;
  }
  return <AddressLink {...props} herf={href} />;
}

export function formatAddress(address?: string, num?: number, num2?: number) {
  if (!address) return address;
  return `${address.slice(0, num ?? 10)}...${address.slice(-(num2 ?? 8))}`;
}
