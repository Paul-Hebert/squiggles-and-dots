import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import { SqPreview } from './sq-preview.js';

export class SqSvg extends SqPreview {
  constructor() {
    super();
  }

  addCanvas = () => {
    return SVG().addTo(this).viewbox(0, 0, this.width, this.height);
  }

  clear = () => {
    this.canvas.clear();
  }

  toUrl = () => {
    return "data:image/svg+xml;utf8," + this.canvas.svg();
  }

  download = () => {
    const anchor = document.createElement('a');
    anchor.setAttribute('download', this.name);
    anchor.setAttribute("href", this.toUrl());
    anchor.setAttribute('target', '_blank');
    anchor.click();
  }
}

customElements.define("sq-svg", SqSvg);
