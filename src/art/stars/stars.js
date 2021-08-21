import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';
import { drawStar } from '../../assets/js/bits/svg/stars.js';

export class Stars extends SvgCanvas {
  name = "Stars";
  width = 1000;
  height = 1000;
  refreshRate = 1000;

  draw = () => {
    this.canvas.style.backgroundColor = '#000';

    this.canvas.innerHTML = drawStar({
      size: random(200, 400),
      cx: 500,
      cy: 500
    });
  }
}

customElements.define("sq-stars", Stars);

