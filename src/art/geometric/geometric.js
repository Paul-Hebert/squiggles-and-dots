import { SvgCanvas } from "../../assets/js/svg-canvas.js";
import {
  random,
  randomBool,
  randomInt,
  randomItemInArray,
} from "../../assets/js/utils/random.js";

export class SqGeometric extends SvgCanvas {
  name = "Geometric";

  width = 600;
  height = 360;

  draw = () => {
    this.baseHue = randomInt(0, 360);
    this.baseLightness = randomInt(20, 30);
    this.baseSaturation = randomInt(50, 70);

    this.colors = [];

    const colorCount = 5;
    for (let i = 1; i <= colorCount; i++) {
      this.colors.push({
        h: this.baseHue + randomInt(-20, 20),
        s: this.baseSaturation + randomInt(-20, 20),
        l: this.baseLightness + 60 / i + 1,
      });
    }

    if (randomBool()) {
      this.colors.push({
        h: this.baseHue + 180,
        s: randomInt(5, 30),
        l: this.baseLightness + random(-5, 40),
      });
    }

    this.scaleUnit = randomItemInArray([60, 120]);
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
        markup += this.randomTile(row, column);
      }
    }

    for (let largeTiles = 0; largeTiles < randomInt(2, 5); largeTiles++) {
      const tileSize = randomItemInArray([2, 3]);
      markup += this.randomTile(
        randomInt(0, this.rows - tileSize),
        randomInt(0, this.columns - tileSize),
        tileSize
      );
    }

    return markup;
  };

  randomTile(row, column, sizeModifer) {
    return randomItemInArray([
      this.rectTile,
      this.curveTile,
      this.circleTile,
    ]).call(this, row, column, sizeModifer);
  }

  circleTile(row, column, sizeModifer = 1) {
    return `
      <circle 
        cx="${column * this.scaleUnit + this.scaleUnit / 2}"
        cy="${row * this.scaleUnit + this.scaleUnit / 2}"
        r="${(this.scaleUnit * sizeModifer * 2) / 5}"
        ${this.fill()}
      />
    `;
  }

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

  fill = () => {
    const { h, s, l } = randomItemInArray(this.colors);
    return `fill="hsl(${h}, ${s}%, ${l}%)"`;
  };

  rotate = (startX, startY) => `
    transform="rotate(
      ${randomItemInArray([0, 1, 2, 3]) * 90} 
      ${startX + this.scaleUnit / 2} 
      ${startY + this.scaleUnit / 2}
    )"
  `;
}

customElements.define("sq-geometric", SqGeometric);
