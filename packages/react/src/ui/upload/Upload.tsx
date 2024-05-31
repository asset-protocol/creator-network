import clsx from "clsx";
import { ReactNode } from "react";

export type UploadProps = {
  accept?: string;
  multiple?: boolean;
  onChange?: (file: string[] | null, files: FileList | null) => void;
  children?: ReactNode;
  className?: string;
}

export function Upload(props: UploadProps) {
  const handleUpload = () => {
    selectFile(props.accept, props.multiple).then(files => {
      let res: string[] = [];
      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i]) {
            res.push(URL.createObjectURL(files[i] as Blob));
          }
        }
      }
      props.onChange?.(res, files);
    })
  }

  return <div onClick={handleUpload} className={clsx("cursor-pointer", props.className)}>
    {props.children}
  </div>
}

export function selectFile(accept?: string, multiple?: boolean): Promise<FileList | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    if (multiple) {
      input.multiple = multiple;
    }
    if (accept) {
      input.accept = accept;
    }
    input.onchange = () => {
      resolve(input.files);
    };
    input.click();
  });
}