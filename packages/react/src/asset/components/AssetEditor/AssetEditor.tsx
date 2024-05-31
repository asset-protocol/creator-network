import { AssetMetadataEditor } from "./AssetMetadataEditor";
import clsx from "clsx";
import {
  AssetEditorProvider,
  AssetEditorProviderProps,
} from "./AssetEditorContext";

export type AssetEditorProps = Omit<AssetEditorProviderProps, "children"> & {
  className?: string;
  onPublished?: (hub: string, assetId: bigint) => void;
};

export function AssetEditor(props: AssetEditorProps) {
  const { className, onPublished, ...resProps } = props;
  return (
    <AssetEditorProvider {...resProps}>
      <div className={clsx("", className)}>
        <AssetMetadataEditor />
      </div>
    </AssetEditorProvider>
  );
}
