import { SvgFlowFieldCanvas } from "../../assets/js/svg-flow-field-canvas.js";
import { random, randomBool, randomInt } from "../../assets/js/utils/random.js";
import FastNoise from "https://unpkg.com/fastnoise-lite@0.0.1/FastNoiseLite.js";
import { formatHsl } from "../../assets/js/utils/format-hsl.js";

export class SqFlowFields extends SvgFlowFieldCanvas {
  constructor() {
    super();

    this.noise = new FastNoise();
    this.noise.SetNoiseType(FastNoise.NoiseType.Value);
  }

  name = "Flow Fields";
  width = 400;
  scaleUnit = 20;
  height = 200;

  searchDistance = 1;
  vectorModifier = 0.25;
  lineLength = 50;
  pointDensity = 0.5;

  rotationFunction({ x, y }) {
    return 200 + this.noise.GetNoise(x, y) * 50;
    // return x * x * random(1.5, 2.5) + y * y * random(1.5, 2.5);
  }

  widthFunction({ x, y }) {
    return 1;
  }

  colorFunction({ x, y }) {
    return {
      h: this.noise.GetNoise(x, y) * 360,
      s: 30,
      l: 50,
    };
  }

  splitLines() {
    const newLines = [];
    this.circles = [];

    this.lines.forEach((line) => {
      const circleIndex = randomInt(10, line.points.length - 10);

      newLines.push({
        ...line,
        points: line.points.slice(0, circleIndex),
      });
      newLines.push({
        ...line,
        points: line.points.slice(circleIndex + 1),
      });
      this.circles.push({
        ...line,
        ...line.points[circleIndex],
      });
    });

    console.log(this.circles);

    this.lines = newLines;
  }

  drawCircles() {
    return this.circles.map(
      ({ x, y, color }) => `
      <circle 
        r="5"
        cx="${x * this.scaleUnit}" 
        cy="${y * this.scaleUnit}" 
        fill="${formatHsl(color)}" 
        stroke="#000" 
      />
    `
    );
  }

  draw = () => {
    this.noise.SetSeed(random(0, 5000));
    this.noise.SetFrequency(0.25);

    this.generateVectors();

    this.svg.style.backgroundColor = "#000";

    this.generateStartingPoints();
    this.generateLines();
    this.splitLines();
    // this.canvas.innerHTML = this.drawVectors();
    // this.canvas.innerHTML = this.drawVectors() + this.drawLines();
    this.canvas.innerHTML = this.drawLines() + this.drawCircles();
  };
}

customElements.define("sq-flow-fields", SqFlowFields);
