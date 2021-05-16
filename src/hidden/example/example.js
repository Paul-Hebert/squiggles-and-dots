import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

export class SqExample extends SvgCanvas {
  name = "Example";
  width = 200;
  height = 100;

  draw = () => {
    this.canvas.style.backgroundColor = `hsl(
      ${random(0, 360)},
      ${random(0, 100)}%,
      ${random(0, 100)}%
    )`;

    let markup = '';

    this.canvas.innerHTML = markup;
  }
}

customElements.define("sq-example", SqExample);

