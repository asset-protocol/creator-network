import { replaceUri } from '@creator-network/core';
import { EmbedBlot } from 'parchment';

const ATTRIBUTES = ['alt', 'height', 'width'];

class Image extends EmbedBlot {
  static blotName = 'image';
  static tagName = 'IMG';

  static create(value: string) {
    const node = super.create(value) as Element;
    if (typeof value === 'string') {
      node.setAttribute('src', this.sanitize(value));
      node.setAttribute("orgin-src", value);
    }
    return node;
  }

  static formats(domNode: Element) {
    return ATTRIBUTES.reduce(
      (formats: Record<string, string | null>, attribute) => {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      },
      {},
    );
  }

  static match(url: string) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }

  static sanitize(url: string) {
    return replaceUri(url) ?? url;
  }

  static value(domNode: Element) {
    return domNode.getAttribute('orgin-src');
  }

  declare domNode: HTMLImageElement;

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

export default Image;