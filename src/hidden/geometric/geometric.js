import { SvgCanvas } from "../../assets/js/svg-canvas.js";
import {
  randomBool,
  randomInt,
  randomItemInArray,
} from "../../assets/js/utils/random.js";

export class SqGeometric extends SvgCanvas {
  name = "Geometric";

  width = 600;
  height = 400;

  draw = () => {
    this.baseHue = randomInt(0, 360);
    this.baseValue = randomInt(10, 90);
    this.scaleUnit = randomItemInArray([40, 50, 100]);
    this.rows = this.width / this.scaleUnit;
    this.columns = this.width / this.scaleUnit;

    this.canvas.innerHTML = this.drawGrid();
  };

  drawGrid = () => {
    let markup = `
      <rect 
        x="0" 
        y="0"
        width="${this.width}"
        height="${this.height}" 
        ${this.fill()}
      />
    `;

    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        markup += randomBool()
          ? this.rectTile(row, column)
          : this.curveTile(row, column);
      }
    }

    for (let largeTiles = 0; largeTiles < randomInt(2, 5); largeTiles++) {
      const tileSize = randomItemInArray([2, 3]);
      markup += randomBool()
        ? this.rectTile(
            randomInt(0, this.rows - tileSize),
            randomInt(0, this.columns - tileSize),
            tileSize
          )
        : this.curveTile(
            randomInt(0, this.rows - tileSize),
            randomInt(0, this.columns - tileSize),
            tileSize
          );
    }

    return markup;
  };

  rectTile(row, column, sizeModifer = 1) {
    return `
      <rect 
        x="${column * this.scaleUnit}"
        y="${row * this.scaleUnit}"
        width="${this.scaleUnit * sizeModifer}"
        height="${this.scaleUnit * sizeModifer}"
        ${this.fill()}
      />
    `;
  }

  curveTile(row, column, sizeModifer = 1) {
    const startX = column * this.scaleUnit;
    const startY = row * this.scaleUnit;

    return `
      <path d="
        M${startX},${startY}
        Q${startX + this.scaleUnit * sizeModifer},${startY}
         ${startX + this.scaleUnit * sizeModifer},
         ${startY + this.scaleUnit * sizeModifer} 
        L${startX},${startY + this.scaleUnit * sizeModifer}
        Z"
        ${this.fill()}
        ${this.rotate(startX, startY)}
      />
    `;
  }

  fill = () => `        
    fill="hsl(
      ${this.baseHue},
      ${randomInt(20, 100)}%,
      ${this.baseValue + randomInt(-10, 10)}%
    )"
  `;

  rotate = (startX, startY) => `
    transform="rotate(
      ${randomItemInArray([0, 1, 2, 3]) * 90} 
      ${startX + this.scaleUnit / 2} 
      ${startY + this.scaleUnit / 2}
    )"
  `;
}

customElements.define("sq-geometric", SqGeometric);
