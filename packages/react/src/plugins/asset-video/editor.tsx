import { TYPE_VIDEO } from "./consts";
import { useAssetHub } from "../../context";
import VideoEditor from "./components/VideoEditor";
import { AssetConfig } from "../../asset";
import { getStorage } from "@creator-network/core";

const videoEditor = (config: AssetConfig) => {
  config.registerEditor({
    types: [{ value: TYPE_VIDEO, label: "Video" }],
    selector: (t) => t === TYPE_VIDEO,
    editor: (props) => <VideoEditor {...props} />,
    useBeforePublish: () => {
      const { storage } = useAssetHub();
      return async (cur, _, onProgress) => {
        if (cur.startsWith("blob:")) {
          const b = await fetch(cur).then((res) => res.blob());
          const url = await getStorage(storage!)!.upload({
            data: b,
            onProgress
          });
          return url;
        }
        return cur;
      };
    },
  });
};
export default videoEditor;
