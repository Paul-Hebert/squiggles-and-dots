import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import { Canvas } from './canvas.js';

export class SvgCanvas extends Canvas {
  constructor() {
    super();
  }

  addCanvas = () => {
    return SVG().addTo(this).viewbox(0, 0, this.width, this.height).attr('class', 'canvas');
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