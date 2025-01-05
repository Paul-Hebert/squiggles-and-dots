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
  pointDensity = 2;

  rotationFunction({ x, y }) {
    const xModifier = (this.xVectorsCount / 2 - x) * y;
    return 90 + xModifier + randomInt(-30, 30);
    // return x * x * random(1.5, 2.5) + y * y * random(1.5, 2.5);
  }

  widthFunction({ x, y }) {
    return 1;
  }

  colorFunction({ x, y }) {
    return {
      h: random(300, 360),
      s: this.noise.GetNoise(x, y) * 60 + 30,
      l: this.noise.GetNoise(x, y) * 30 + 60,
    };
  }

  // generateStartingPoints() {
  //   this.startingPoints = [];

  //   const x = this.xVectorsCount / 2;
  //   const y = 2;

  //   for (let i = 0; i < 50; i++) {
  //     this.startingPoints.push({
  //       x: x + random(-1, 1),
  //       y: y + randomInt(-1, 1),
  //       color: this.colorFunction({ x, y }),
  //       width: this.widthFunction({ x, y }),
  //     });
  //   }
  // }

  draw = () => {
    this.noise.SetSeed(random(0, 5000));
    this.noise.SetFrequency(0.25);

    this.generateVectors();

    this.generateStartingPoints();
    this.generateLines();
    // this.canvas.innerHTML = this.drawVectors();
    // this.canvas.innerHTML = this.drawVectors() + this.drawLines();
    this.canvas.innerHTML = this.drawLines();
  };
}

customElements.define("sq-flow-fields", SqFlowFields);
