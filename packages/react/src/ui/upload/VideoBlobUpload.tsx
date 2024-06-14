import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Upload } from "./Upload";
import { replaceUri } from "@creator-network/core";

export type VideoBlobUploadProps = {
  value?: string;
  onChange?: (v: string | undefined) => void;
  accept?: string;
  children?: React.ReactNode;
};

export function VideoBlobUpload(props: VideoBlobUploadProps) {
  const [file, setFile] = useState<string | undefined>(replaceUri(props.value));
  function handleOnChange(files: string[] | null): void {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }
  useEffect(() => {
    props.onChange?.(file);
  }, [file]);
  return (
    <div className="w-full">
      <Upload
        accept={props.accept}
        onChange={handleOnChange}
      >
        {props.children ? props.children :
          <p className="bg-gray-400 w-full aspect-video m-auto">
            Click or drag video file to this area to upload
          </p>}
      </Upload>
      <div className="w-full aspect-video rounded-xl overflow-hidden mt-4">
        <ReactPlayer
          url={file}
          width={"100%"}
          height={"100%"}
          controls
        ></ReactPlayer>
      </div>
    </div>
  );
}
