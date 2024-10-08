import { EmbedBlot } from "parchment";
import {
  BlotVideoPlayer,
  BlotVideoPlayerProps,
} from "../components/BlotVideoPlayer";
import ReactDOM from "react-dom";
import { replaceUri } from "@creator-network/core";

const ATTRIBUTES = ["height", "width"];

class Audio extends EmbedBlot {
  static blotName = "audio";
  static className = "ql-audio";

  static create(value: string) {
    const cp = createVideoComponent(this.sanitize(value));
    const container = document.createElement("div");
    container.classList.add(Audio.className);
    container.setAttribute("orgin-src", value);
    container.setAttribute("width", "100%");
    ReactDOM.render(cp, container);
    return container;
  }

  static formats(domNode: Element) {
    return ATTRIBUTES.reduce(
      (formats: Record<string, string | null>, attribute) => {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      },
      {}
    );
  }

  static sanitize(url: string) {
    return replaceUri(url) ?? url;
  }

  static value(domNode: Element) {
    return domNode.getAttribute("orgin-src");
  }

  declare domNode: HTMLVideoElement;

  format(name: string, value: string) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
function createVideoComponent(url: string) {
  const props: BlotVideoPlayerProps = { url };
  return <BlotVideoPlayer {...props}></BlotVideoPlayer>;
}
export default Audio;
