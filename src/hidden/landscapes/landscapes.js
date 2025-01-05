import { SvgCanvas } from "../../assets/js/svg-canvas.js";
import { random, randomBool, randomInt } from "../../assets/js/utils/random.js";

import { spline } from "https://unpkg.com/@georgedoescode/spline@1.0.1/spline.js";

export class SqLandscapes extends SvgCanvas {
  name = "Landscapes";
  width = 1000;
  height = 1000;

  thinStroke = 2;

  thickStroke = 10;

  draw = () => {
    let markup = this.sky() /*+ this.clouds()*/ + this.ground();

    this.canvas.innerHTML = markup;
  };

  sky = () => {
    const skyHue = randomInt(180, 250);

    const lines = [];

    const lineSpacing = this.height / randomInt(10, 20);

    for (let y = -1 * lineSpacing; y <= this.height; y += lineSpacing) {
      lines.push(`
        <path
          d="
            M0 ${y + randomInt((-1 * lineSpacing) / 4, lineSpacing / 4)}
            L${this.width} ${
        y + randomInt((-1 * lineSpacing) / 4, lineSpacing / 4)
      }
            L${this.width} ${this.height}
            L0 ${this.height}
          "
          stroke="hsl(${skyHue}, 50%, ${y / 30}%)"
          stroke-width="${this.thinStroke}"
          fill="hsl(${skyHue}, ${25 + y / 30}%, ${25 + y / 30}%)"
        />
      `);
    }

    return `<g class="sky">
      ${lines.join("\n")}
    </g>`;
  };

  ground() {
    const lines = [];

    const lineSpacing = this.height / random(15, 25);

    for (
      let y = this.height * random(0.6, 0.75);
      y < this.height;
      y += lineSpacing
    ) {
      lines.push(this.groundLine(y));
    }

    return lines.join("\n");
  }

  groundLine(y) {
    const points = [{ x: 0, y: this.height }];

    const pointSpacing = this.width / (randomBool() ? 10 : 25);
    const horizontalModifier = 5 * randomInt(1, 2);
    const verticalModifier = random(20, 30);

    const xModifier = randomInt(0, pointSpacing / 10);

    for (
      let x = -1 * pointSpacing + xModifier;
      x <= this.width + pointSpacing + xModifier;
      x += pointSpacing
    ) {
      points.push({
        x: x + random(-5, 5),
        y:
          y +
          Math.sin(x * horizontalModifier) * verticalModifier +
          random(-5, 5),
      });
    }

    points.push({ x: this.width, y: this.height });

    return `
      <path
        d="${spline(points)}"
        stroke="hsl(120, 20%, 15%)"
        stroke-width="${this.thickStroke}"
        fill="hsl(
          ${randomInt(70, 120)}, 
          ${randomInt(20, 50)}%, 
          ${randomInt(20, 40)}%
        )"
      />
    `;
  }

  clouds() {
    const clouds = [];

    const cloudStartX = randomInt(0, this.width);
    const cloudSpreadX = this.width / randomInt(1, 2);
    const cloudYMax = this.height / randomInt(2, 5);

    for (let i = 0; i < 30; i++) {
      const y = randomInt(50, cloudYMax);

      console.log(y);

      clouds.push(`
        <circle 
          cx="${cloudStartX + randomInt(-1 * cloudSpreadX, cloudSpreadX)}" 
          cy="${y}" 
          r="${(randomInt(10, 20) * cloudYMax) / (y / 3)}" 
          fill="#fff"
        />
      `);
    }

    return clouds.join("\n");
  }
}

customElements.define("sq-landscapes", SqLandscapes);
