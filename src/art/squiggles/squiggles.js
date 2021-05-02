import { SqSvg } from '../../assets/js/sq-svg.js'
import {
  random
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";


export class SqSquiggles extends SqSvg {
  name = "Squiggles";
  width = 200;
  height = 100;

  draw = () => {
    for(let i = 0; i < random(80, 100); i++) {
      if(this.randomBool(0.15)) {
        this.squiggle(this.canvas, this.width, this.height);
      } else {
        this.dot()
      }
    }
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
    this.canvas
      .circle(size)
      .move(this.randomX(), this.randomY())
      .fill(`hsl(
        ${random(0, 360)},
        ${random(20, 30)}%,
        ${random(80, 90)}%
      )`)
      // .stroke({
      //   color: '#fff',
      //   width: 0.25
      // });
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

    this.canvas
      .path(points.join(' '))
      .stroke({
        width: random(1, 6),
        color: `hsl(
          ${random(0, 360)},
          ${random(60, 80)}%,
          ${random(80, 90)}%
        )`
      })
      .fill('none');
  }
}

customElements.define("sq-squiggles", SqSquiggles);
