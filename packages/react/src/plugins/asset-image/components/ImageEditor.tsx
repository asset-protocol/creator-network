import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAssetEditor } from "../../../asset";
import { replaceUri } from "@creator-network/core";
import { Button, Upload } from "../../../ui";
import { uuidV4 } from "ethers";
import { randomUUID } from "crypto";

export type ImageFileInfo = {
  uid: string;
  url: string;
};

export default function ImageEditor() {
  const { content, setContent, metadata, setMetadata } = useAssetEditor();
  let images: string[] | string = content ?? [];
  if (typeof content === "string") {
    try {
      images = JSON.parse(content) as string[];
    } catch (e) {
      console.warn(e);
      images = [];
    }
  }
  const fs = (images as string[]).map((f) => ({ uid: f, url: f }));
  const [files, setFiles] = useState(fs);

  const handleOnChange = (value: string[] | null, fileList: FileList | null) => {
    if (!fileList) {
      return;
    }
    const newFiles = value?.map(v => ({ uid: randomUUID().toString(), url: v }));
    if (newFiles) {
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveImage = (f: ImageFileInfo) => {
    const res = files.filter((file) => file.uid !== f.uid);
    setFiles(res);
    if (metadata?.image === f.url) {
      setMetadata(metadata && { ...metadata, image: res[0]?.url });
    }
  };

  useEffect(() => {
    setContent(JSON.stringify(files.map((f) => f.url)));
  }, [files]);

  useEffect(() => {
    const target = files[0]?.url;
    if (target === metadata?.image) return;
    if (!metadata) {
      setMetadata({ name: "", image: files[0]?.url });
    } else if (!metadata.image || files.find((f) => f.url === metadata.image)) {
      //未设置封面或者封面是通过图片列表设置的（非手动设置），则更新封面
      setMetadata(metadata && { ...metadata, image: files[0]?.url });
    }
  }, [files, metadata]);

  return (
    <div>
      <Upload
        multiple
        onChange={handleOnChange}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Upload>
      {files?.map((f, i) => (
        <div className="relative w-full" key={f.uid + i}>
          <img
            width="100%"
            className="min-h-[100px]"
            title={f.url}
            src={replaceUri(f.url)}
            key={f.uid + i}
          />
          <Button
            className="absolute right-0 top-0"
            onClick={() => handleRemoveImage(f)}
          ><DeleteOutlined /></Button>
        </div>
      ))}
    </div>
  );
}
