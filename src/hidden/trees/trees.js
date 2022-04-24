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
        if (command === "L") {
          const h = random(40, 170);
          const s = random(50, 80);
          const l = random(20, 80);
          const height = this.distance / random(1, 2);
          const width = this.distance / random(2, 5);

          this.markup += `
            <ellipse
              cx="${this.position.x}" 
              cy="${this.position.y + height / 2}" 
              rx="${width}"
              ry="${height}"
              transform="rotate(${this.rotation} ${this.position.x} ${
            this.position.y
          })"  
              fill="hsl(${h}, ${s}%, ${l}%)"
            />`;
        }
        if (command === "B") {
          const h = random(210, 330);
          const s = random(70, 80);
          const l = random(60, 80);
          const height = this.distance * random(2, 3);
          const width = this.distance * random(1, 1.3);
          this.markup += `
            <ellipse
              cx="${this.position.x}" 
              cy="${this.position.y + height - 1}" 
              ry="${height}"
              rx="${width}"
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
            // replacement: "F+L[[XB]-XL]-F[-FXBL]+XL",
            replacement: "F[[-FXL]+XL]+F[-FXL]+XL",
            chance: "0.8",
          },
          F: {
            replacement: "FF",
            chance: "0.6",
          },
          L: {
            replacement: "B",
            chance: "0.05",
          },
        },
        iterations: random(5, 7),
      }),
      startRotation: random(175, 185),
      turnRotation: random(15, 30),
      distance: random(2, 6),
      startPosition: { x: 250, y: 480 },
    });

    this.canvas.innerHTML += `
      <line x1="170" y1="480" x2="330" y2="480" stroke="black" />
    `;
  };
}

customElements.define("sq-trees", SqTrees);
