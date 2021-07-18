import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

export class SqCurves extends SvgCanvas {
  name = "Squares";
  width = 100;
  height = this.width;

  draw = () => {
    this.hue = `hsl(
      ${random(0, 360)},
      ${random(10, 100)}%,
      ${random(20, 80)}%
    )`;

    let gridSize = Math.round(random(5, 15));
    let size = this.width/gridSize;
    
    let minLines = 5

    this.lineCount = Math.round(random(minLines, minLines + (size / 10)));
    let baseStrokeWidth = size / (this.lineCount * 10);
    this.strokeWidth = random(baseStrokeWidth * 0.5, baseStrokeWidth * 1.5);

    let markup = '';

    for(let row = 0; row < gridSize; row++) {
      markup += `<g>`;
      for(let col = 0; col < gridSize; col++) {
        markup += this.addSection(
          col * size, 
          row * size, 
          size, 
          size
        );
      }
      markup += `</g>`;
    }

    // Uncomment to test one big curve
    // markup = this.addSection(
    //   0, 
    //   0, 
    //   this.width, 
    //   this.height
    // );

    this.canvas.innerHTML = markup;
  }

  addSection = (x, y, size) => {
    let markup = '';
    for (let i = 0; i < this.lineCount; i++) {
      const currentSize = size / this.lineCount;

      markup += /*html*/`
        <circle
          cx="${x + (this.lineCount * i)}"
          cy="${y + (this.lineCount * i)}"
          r="${currentSize}"
          stroke="${this.hue}"
          stroke-width="${this.strokeWidth}"
          fill="none"
        />
      `;
    }

    return `<g>${markup}</g>`;
  }
}

customElements.define("sq-curves", SqCurves);

