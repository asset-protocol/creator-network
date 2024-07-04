import { Upload, UploadProps } from '@creator-network/react/ui';
import { AvatarUploadProps } from './AvatarUpload';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from 'antd';
import { UploadIcon } from 'lucide-react';
import { replaceUri } from '@creator-network/core';

export type BlobUploadProps = {
  value?: string;
  onChange?: (value?: string) => void;
  className?: string;
  accept?: string;
  children?: React.ReactNode;
};

export function BlobUpload(props: BlobUploadProps) {
  return (
    <Upload
      className={props.className}
      accept={props.accept}
      children={props.children}
      onChange={(value) => {
        props.onChange?.(value?.[0]);
      }}
    />
  );
}

export function ImageBlobUpload(props: BlobUploadProps) {
  const { value, onChange, ...resProps } = props;
  const [blob, setBlob] = useState<string | undefined>(value);
  const handleChange = (blob?: string) => {
    setBlob(blob);
    onChange?.(blob);
  };
  return (
    <BlobUpload {...resProps} onChange={handleChange} accept="image/*">
      <Button
        type="text"
        className="p-0 h-auto rounded-lg w-[400px] aspect-[2/1] overflow-hidden"
      >
        {blob && (
          <Image
            src={replaceUri(blob)!}
            alt="preview"
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        )}
        {!blob && <UploadIcon />}
      </Button>
    </BlobUpload>
  );
}
