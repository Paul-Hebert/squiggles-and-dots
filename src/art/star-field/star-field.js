import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { drawStarField } from '../../assets/js/bits/svg/draw-star-field.js';

export class SqStarField extends SvgCanvas {
  name = "StarField";
  width = 268 * 4.25;
  height = 360 * 4.25;

  draw = () => {
    this.canvas.style.backgroundColor = '#000';

    this.canvas.innerHTML = drawStarField({ width: this.width, height: this.height });
  }
}

customElements.define("sq-star-field", SqStarField);

