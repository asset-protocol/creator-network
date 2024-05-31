import { Asset, replaceUri } from "@creator-network/core";
import ReactPlayer from "react-player";
import { AssetViewerHeader } from "../../../asset";

export default function VideoViewer({
  value,
}: {
  value: Asset;
  classname?: string;
}) {
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="w-full aspect-video rounded-xl overflow-hidden">
        <ReactPlayer
          url={replaceUri(value.content)}
          controls
          width={"100%"}
          height={"100%"}
        ></ReactPlayer>
      </div>
    </div>
  );
}