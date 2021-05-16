import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

export class SqIsometric extends SvgCanvas {
  name = "Isometric";
  width = 200;
  height = 100;

  cubeWidth = 20;
  cubeHeight = 10;
  cubeDepth = 8;

  draw = () => {
    this.generateStyles();

    let point = {x: 100, y: 34};

    this.cubeRow(point, 1)

    point = this.updatePoint(point);
    this.cubeRow(point, 2)

    point = this.updatePoint(point);
    this.cubeRow(point, 3)

    point = this.updatePoint(point);
    this.cubeRow(point, 4)

    point = this.updatePoint(point);
    this.cubeRow(point, 5)

    point = this.updatePoint(point, 1);
    this.cubeRow(point, 4)

    point = this.updatePoint(point, 1);
    this.cubeRow(point, 3)

    point = this.updatePoint(point, 1);
    this.cubeRow(point, 2)

    point = this.updatePoint(point, 1);
    this.cubeRow(point, 1)
  }

  updatePoint = (point, direction = -1) => {
    return {
      x: point.x + this.cubeWidth/2 * direction,
      y: point.y + this.cubeDepth/2,
    }
  }

  cubeRow = (point, count) => {
    let currentPoint = {...point};
    let cubes = 0;

    while(cubes < count) {
      this.cube(currentPoint);
      currentPoint.x += this.cubeWidth;
      cubes++;
    }
  }

  cube = (startPoint) => {
    const depth = this.cubeDepth;
    const width = this.cubeWidth;
    const height = this.cubeHeight;

    const attrs = `
      ${this.cubeStyles[Math.round(random(0, this.cubeStyles.length - 1))]}
      stroke="hsla(0, 0%, 50%, 20%)"
      stroke-linejoin="bevel"
      stroke-width="1"
    `

    const top = /* html */`
      <path d="
        M ${startPoint.x} ${startPoint.y}
        l ${width/2} ${depth/-2}
        l ${width/-2} ${depth/-2}
        l ${width/-2} ${depth/2}
        Z
      "
      ${attrs}/>
    `;

    const side1 = /* html */`
      <path d="
        M ${startPoint.x} ${startPoint.y}
        l ${width/-2} ${depth/-2}
        l 0 ${height}
        l ${width/2} ${depth/2}
        Z
      "
      ${attrs}/>
    `;

    const side2 = /* html */`
      <path d="
        M ${startPoint.x} ${startPoint.y}
        l ${width/2} ${depth/-2}
        l 0 ${height}
        l ${width/-2} ${depth/2}
        Z
      "
      ${attrs}/>
    `;

    this.canvas.innerHTML += top + side1 + side2;
  }

  randomStyle = () => {
    const hue = random(0, 360);
    return `
      fill="hsl(${hue}, ${random(0, 100)}%, ${random(30, 100)}%)"
      stroke="hsl(${hue}, ${random(0, 100)}%, ${random(20, 30)}%)"
    `
  }

  generateStyles = () => {
    this.cubeStyles =  [
      this.randomStyle(),
      this.randomStyle(),
      this.randomStyle(),
    ]
  }
}

customElements.define("sq-isometric", SqIsometric);

