import { SvgCanvas } from "./svg-canvas.js";
import { angledDistanceToXY } from "./utils/angled-distance-to-x-y.js";
import { distanceBetweenPoints } from "./utils/distance-between-points.js";
import { formatHsl } from "./utils/format-hsl.js";
import { random, randomInt } from "./utils/random.js";

import { spline } from "https://unpkg.com/@georgedoescode/spline@1.0.1/spline.js";

export class SvgFlowFieldCanvas extends SvgCanvas {
  constructor() {
    super();
  }

  scaleUnit = 10;
  searchDistance = 1;
  vectorModifier = 0.5;
  lineLength = 30;
  pointDensity = 2;

  configureScale() {
    this.xVectorsCount = this.width / this.scaleUnit;
    this.yVectorsCount = this.height / this.scaleUnit;
  }

  generateVectors() {
    if (!this.xVectorsCount) this.configureScale();

    this.vectors = [];

    for (let y = -1; y <= this.yVectorsCount; y++) {
      for (let x = -1; x <= this.xVectorsCount; x++) {
        this.vectors.push({ x, y, rotation: this.rotationFunction({ x, y }) });
      }
    }
  }

  drawVectors() {
    return this.baseArrow() + this.vectors.map(this.drawArrow).join("\n");
  }

  drawArrow = ({ x, y, rotation }) => {
    return `
      <use
        href="#arrow-symbol"
        width="${this.scaleUnit}" 
        height="${this.scaleUnit}"
        x="${x * this.scaleUnit}"
        y="${y * this.scaleUnit}"
        transform="rotate(
          ${rotation} 
          ${x * this.scaleUnit + this.scaleUnit / 2}
          ${y * this.scaleUnit + this.scaleUnit / 2}
        )"
      />
    `;
  };

  baseArrow() {
    return ` 
      <symbol id="arrow-symbol" viewBox="0 0 20 20" width="20" height="20">
        <line stroke="#999" stroke-width="2" x1="2" x2="17" y1="10" y2="10" />
        <path stroke="#999" fill="#666" stroke-width="2" d="M14 8 L17 10 L14 12 Z"/>
      </symbol>
    `;
  }

  rotationFunction({ x, y }) {
    return randomInt(0, 360);
  }

  generateStartingPoints() {
    if (!this.xVectorsCount) this.configureScale();

    this.startingPoints = [];

    const delta = 1 / this.pointDensity;

    for (let y = -1; y <= this.yVectorsCount + 1; y += delta) {
      for (let x = -1; x <= this.xVectorsCount + 1; x += delta) {
        this.startingPoints.push({
          x: x + randomInt(-1, 1),
          y: y + randomInt(-1, 1),
          color: this.colorFunction({ x, y }),
          width: this.widthFunction({ x, y }),
        });
      }
    }
  }

  getNextPoint(point) {
    const newPoint = { ...point };

    this.vectors
      .filter(
        (vector) =>
          distanceBetweenPoints(newPoint, vector) < this.searchDistance
      )
      .forEach((vector) => {
        const { xDelta, yDelta } = angledDistanceToXY({
          distance: 1,
          ...vector,
        });

        newPoint.x += xDelta * this.vectorModifier;
        newPoint.y += yDelta * this.vectorModifier;
      });

    return newPoint;
  }

  generateLines() {
    this.generateStartingPoints();

    this.lines = this.startingPoints.map(({ x, y, color, width }) => {
      const pointsOnLine = [{ x, y }];

      for (let i = 0; i < this.lineLength; i++) {
        pointsOnLine.push(this.getNextPoint(pointsOnLine.at(-1)));
      }

      return {
        points: pointsOnLine,
        color,
        width,
      };
    });
  }

  drawLines() {
    this.generateLines();

    return this.lines
      .map(
        ({ points, color, width }) =>
          `<path 
            d="${spline(
              points.map(({ x, y }) => ({
                x: x * this.scaleUnit,
                y: y * this.scaleUnit,
              }))
            )}"
            fill="none"
            stroke="${formatHsl(color)}"
            stroke-width="${width}"
          />`
      )
      .join("\n");
  }

  colorFunction({ x, y }) {
    return { h: randomInt(0, 360), s: randomInt(80, 90), l: randomInt(10, 90) };
  }

  widthFunction({ x, y }) {
    return random(1, 5);
  }
}
