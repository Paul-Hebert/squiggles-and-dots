import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

export class SqVoronoi extends SvgCanvas {
  name = "Voronoi";
  width = 200;
  height = 100;

  dots = [];

  drawDots = () => {
    return this.dots.map(dot => `
      <circle cx="${dot.x}" cy="${dot.y}" r="1" />
    `.trim()).join('');
  }

  draw = () => {
    for (let i = 0; i < 50; i++) {
      this.dots.push({
        x: random(0, this.width),
        y: random(0, this.height)
      })
    }

    let markup = '';

    markup += this.drawDots();

    this.canvas.innerHTML = markup;
  }
}

customElements.define("sq-voronoi", SqVoronoi);

