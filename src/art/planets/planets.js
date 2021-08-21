import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';
import { drawPlanet } from '../../assets/js/bits/svg/planets.js';

export class Planets extends SvgCanvas {
  name = "Planets";
  width = 1000;
  height = 1000;
  refreshRate = 1000;

  draw = () => {
    this.canvas.style.backgroundColor = '#000';

    this.canvas.innerHTML = drawPlanet({
      size: random(200, 400),
      cx: 500,
      cy: 500
    });
  }
}

customElements.define("sq-planets", Planets);

