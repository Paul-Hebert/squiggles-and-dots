import { SvgFlowFieldCanvas } from "../../assets/js/svg-flow-field-canvas.js";
import { random, randomBool, randomInt } from "../../assets/js/utils/random.js";
import FastNoise from "https://unpkg.com/fastnoise-lite@0.0.1/FastNoiseLite.js";

export class SqFlowFields extends SvgFlowFieldCanvas {
  constructor() {
    super();

    this.noise = new FastNoise();
    this.noise.SetNoiseType(FastNoise.NoiseType.OpenSimplex2);
  }

  name = "Flow Fields";
  width = 400;
  scaleUnit = 20;
  height = 200;

  searchDistance = 1;
  vectorModifier = 0.5;
  lineLength = 10;
  pointDensity = 4;

  rotationFunction({ x, y }) {
    return this.noise.GetNoise(x, y) * 720;
    // return x * x * random(1.5, 2.5) + y * y * random(1.5, 2.5);
  }

  widthFunction({ x, y }) {
    return 1;
  }

  colorFunction({ x, y }) {
    return {
      h: this.noise.GetNoise(x, y) * 720,
      s: randomInt(20, 60),
      l: randomInt(30, 60),
    };
  }

  draw = () => {
    this.noise.SetSeed(random(0, 5000));
    this.noise.SetFrequency(random(0.001, 0.01));

    this.generateVectors();

    this.svg.style.backgroundColor = "#000";

    this.generateStartingPoints();
    this.generateLines();
    // this.canvas.innerHTML = this.drawVectors();
    // this.canvas.innerHTML = this.drawVectors() + this.drawLines();
    this.canvas.innerHTML = this.drawLines();
  };
}

customElements.define("sq-flow-fields", SqFlowFields);
