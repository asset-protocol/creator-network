import { Asset, replaceUri } from "@creator-network/core";
import { VideoPlayer } from "../../../ui/VideoPlayer/VideoPalyer";
import { AssetViewerHeader } from "../../../asset";

export default function EmbedVideoViewer({
  value,
}: {
  value: Asset;
  classname?: string;
}) {
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="aspect-video rounded-xl overflow-hidden">
        <VideoPlayer
          url={replaceUri(value.content)}
          controls
        ></VideoPlayer>
      </div>
    </div>
  );
}
