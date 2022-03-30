import { Canvas } from "./canvas.js";

export class SvgCanvas extends Canvas {
  constructor() {
    super();
  }

  addCanvas = () => {
    this.innerHTML += /* html */ `
      <svg
        viewBox="0 0 ${this.width} ${this.height}"
        class="canvas"
         xmlns="http://www.w3.org/2000/svg"
         version="1.1"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         role="img"
      >
        <title>${this.name}</title>
        <g class="js-canvas"></g>
        <defs class="js-defs"></defs>
        <style class="js-styles"></style>
      </svg>
    `;

    this.svg = this.querySelector("svg");
    this.defs = this.querySelector(".js-defs");
    this.styles = this.querySelector(".js-styles");
    return this.querySelector(".js-canvas");
  };

  clear = () => {
    this.canvas.innerHTML = "";
  };

  toUrl = () => {
    return "data:image/svg+xml;utf8," + this.innerHTML;
  };

  download = () => {
    const anchor = document.createElement("a");
    anchor.setAttribute("download", this.name);
    anchor.setAttribute("href", this.toUrl());
    anchor.setAttribute("target", "_blank");
    anchor.click();
  };
}
