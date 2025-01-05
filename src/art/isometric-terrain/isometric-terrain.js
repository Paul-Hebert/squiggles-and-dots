import { SvgCanvas } from "../../assets/js/svg-canvas.js";
import { distanceBetweenPoints } from "../../assets/js/utils/distance-between-points.js";
import { random } from "../../assets/js/utils/random.js";
import FastNoise from "https://unpkg.com/fastnoise-lite@0.0.1/FastNoiseLite.js";

export class SqIsometricTerrain extends SvgCanvas {
  name = "IsometricTerrain";
  width = 200;
  height = 200;

  cubeWidth = 10;
  cubeDepth = 4;

  rowCount = 15;

  noise = new FastNoise();

  draw = () => {
    this.noise = new FastNoise();
    this.noise.SetNoiseType(FastNoise.NoiseType.Perlin);
    this.noise.SetFrequency(Math.random() * 0.1);

    let point = { x: 100, y: 80 };

    this.cubeRow(point, 1);

    for (let i = 2; i <= this.rowCount; i++) {
      point = this.updatePoint(point);
      this.cubeRow(point, i);
    }

    for (let i = this.rowCount - 1; i >= 1; i--) {
      point = this.updatePoint(point, 1);
      this.cubeRow(point, i);
    }
  };

  updatePoint = (point, direction = -1) => {
    return {
      x: point.x + (this.cubeWidth / 2) * direction,
      y: point.y + this.cubeDepth / 2,
    };
  };

  cubeRow = (point, count) => {
    let currentPoint = { ...point };
    let cubes = 0;

    while (cubes < count) {
      this.cube(currentPoint);
      currentPoint.x += this.cubeWidth;
      cubes++;
    }
  };

  cube = (startPoint) => {
    const depth = this.cubeDepth;
    const width = this.cubeWidth;

    const centerPoint = {
      x: this.width / 2,
      y: this.height / 2,
    };

    const distanceFromCenter = distanceBetweenPoints(startPoint, centerPoint);

    const noise = this.noise.GetNoise(startPoint.x, startPoint.y);

    let height = 20 + 30 * noise - distanceFromCenter / 3;

    if (height < 5) {
      height = 5;
    }

    let hue = 200;
    let lightness = 50;
    let saturation = 50;

    if (height > 25) {
      hue = 180;
      lightness = 95;
      saturation = 20;
    } else if (height > 20) {
      hue = 30;
      lightness = 30;
      saturation = 10;
    } else if (height > 5) {
      hue = 100;
      lightness = 30;
      saturation = 50;
    }

    const attrs = `
      fill="hsl(${hue}, ${saturation}%, ${lightness}%)"
      stroke="hsl(${hue}, ${saturation}%, ${lightness - 40}%)"
      stroke-linejoin="bevel"
      stroke-width="1"
    `;

    const point = {
      ...startPoint,
      y: startPoint.y - height,
    };

    const top = /* html */ `
      <path d="
        M ${point.x} ${point.y}
        l ${width / 2} ${depth / -2}
        l ${width / -2} ${depth / -2}
        l ${width / -2} ${depth / 2}
        Z
      "
      ${attrs}/>
    `;

    const side1 = /* html */ `
      <path d="
        M ${point.x} ${point.y}
        l ${width / -2} ${depth / -2}
        l 0 ${height}
        l ${width / 2} ${depth / 2}
        Z
      "
      ${attrs}/>
    `;

    const side2 = /* html */ `
      <path d="
        M ${point.x} ${point.y}
        l ${width / 2} ${depth / -2}
        l 0 ${height}
        l ${width / -2} ${depth / 2}
        Z
      "
      ${attrs}/>
    `;

    this.canvas.innerHTML += top + side1 + side2;
  };
}

customElements.define("sq-isometric-terrain", SqIsometricTerrain);
