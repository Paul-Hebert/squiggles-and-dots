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
}

customElements.define("sq-svg", SqSvg);
