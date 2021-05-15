import { SvgCanvas } from '../../assets/js/svg-js-canvas.js'

export class SqExample extends SvgJsCanvas {
  name = "Example";
  width = 200;
  height = 100;

  draw = () => {
    this.canvas.style.backgroundColor = `hsl(
      ${random(0, 360)},
      ${random(0, 100)}%,
      ${random(0, 100)}%
    )`;
  }
}

customElements.define("sq-example", SqExample);

