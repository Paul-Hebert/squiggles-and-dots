import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";

export class Sandbox {
  constructor(drawFunction) {
    this.canvas = SVG('.canvas');

    this.draw = () => {
      drawFunction(this.canvas);
    };

    this.bindControls();
    this.draw();
  }

  refreshInterval = null;
  isPlaying = false;

  refresh = () => {
    this.canvas.clear();
    this.draw();
  }

  play = () =>  {
    this.isPlaying = true;
    this.refreshInterval = setInterval(this.refresh, 500);
  }

  pause = () =>  {
    this.isPlaying = false;
    clearInterval(this.refreshInterval);
  }

  toggle = () =>  {
    this.isPlaying ? this.pause() : this.play();
  }

  bindControls = () =>  {
    document.querySelector(".js-refresh").addEventListener("click", () => this.refresh());
    document.querySelector(".js-slideshow").addEventListener("click",  () => this.toggle());
  }
} 