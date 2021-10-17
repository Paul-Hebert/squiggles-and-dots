import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

export class SqSquiggles extends SvgCanvas {
  name = "Squiggles";
  width = 228;
  height = 360;

  draw = () => {
    let markup = '';
    for(let i = 0; i < random(80, 100); i++) {
      if(this.randomBool(0.15)) {
        markup += this.squiggle(this.width, this.height);
      } else {
        markup += this.dot()
      }
    }

    this.canvas.innerHTML = markup;
  }

  randomBool(chance) {
    return Boolean(Math.random() <= chance);
  }

  randomX() {
    return random(0, this.width);
  }

  randomY() {
    return random(0, this.height);
  }
    
  dot = () => {
    const size = this.randomBool(0.99) ? random(2, 5) : random(30, 70);
    return `
      <circle
        r="${size}"
        cx="${this.randomX()}"
        cy="${this.randomY()}"
        fill="hsl(${random(0, 360)}, ${random(20, 30)}%, ${random(80, 90)}%)"
      />
    `;
  }
    
  squiggle = () => {
    const xDirection = this.randomBool(0.5) ? 1 : -1;
    const yDirection = this.randomBool(0.5) ? 1 : -1;
    const height = random(10, 50);
    const width = random(10, 70);

    const points = [`M${this.randomX()} ${this.randomY()}`];

    points.push(`
      c${random(0, width) * xDirection * -1} ${random(0, height/3) * yDirection} 
       ${random(0, width) * xDirection} ${random(height/3, height*2/3) * yDirection} 
       ${random(0, width/2) * xDirection} ${random(height*2/3, height) * yDirection}
    `);

    if(this.randomBool(0.3)) {
      points.push(`s${random(0, 20) * xDirection} ${random(0, 20) * yDirection}`);
    }

    return `
      <path
        d="${points.join(' ')}"
        stroke-width="${random(1, 6)}"
        stroke="hsl(${random(0, 360)}, ${random(60, 80)}%, ${random(80, 90)}%)"
        fill="none"
      />
    `;
  }
}

customElements.define("sq-squiggles", SqSquiggles);
