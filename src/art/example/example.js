import { SvgJsCanvas } from '../../assets/js/svg-js-canvas.js'
import {
  random
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";

export class SqExample extends SvgJsCanvas {
  name = "Example";
  width = 200;
  height = 100;

  draw = () => {
    this.canvas.node.style.backgroundColor = `hsl(
      ${random(0, 360)},
      ${random(0, 100)}%,
      ${random(0, 100)}%
    )`;
  }
}

customElements.define("sq-example", SqExample);

