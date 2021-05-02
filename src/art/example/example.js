import { SqSvg } from '../../assets/js/sq-svg.js'
import {
  random
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";

export class SqExample extends SqSvg {
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

