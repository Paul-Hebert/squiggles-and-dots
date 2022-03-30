import {
  parse,
  SvgRenderer,
} from "https://unpkg.com/l-system-tools@0.0.1/index.js";
import { SvgCanvas } from "../../assets/js/svg-canvas.js";
import { random } from "../../assets/js/utils/random.js";

export class SqTrees extends SvgCanvas {
  name = "Generative Trees";
  width = 500;
  height = 500;

  connectedCallback() {
    this.canvas = this.addCanvas();
    this.styles.innerHTML = `
      line {
        stroke-width: 1px;
      }
    `;
    class TreeRenderer extends SvgRenderer {
      customCommand = (command) => {
        if (command === "C") {
          const h = random(0, 130);
          const s = random(50, 80);
          const l = random(20, 80);
          this.markup += `
            <circle
              cx="${this.position.x}" 
              cy="${this.position.y}" 
              r="${this.distance / random(1, 2)}"
              fill="hsl(${h}, ${s}%, ${l}%)"
            />`;
        }
      };
    }

    this.renderer = new TreeRenderer(this.canvas);
    this.draw();
  }

  draw = () => {
    this.renderer.render({
      commandString: parse({
        axiom: "X",
        productions: {
          X: {
            replacement: "F+[[XC]-X]-F[-FXC]+X",
            chance: "0.8",
          },
          F: {
            replacement: "FF",
            chance: "0.6",
          },
        },
        iterations: random(5, 7),
      }),
      startRotation: random(175, 185),
      turnRotation: random(15, 30),
      distance: random(2, 6),
      startPosition: { x: 250, y: 500 },
    });
  };
}

customElements.define("sq-trees", SqTrees);
