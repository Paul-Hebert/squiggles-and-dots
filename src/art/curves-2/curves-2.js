import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

export class SqCurves2 extends SvgCanvas {
  name = "SqCurves2";
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
          col, 
          row, 
          size, 
        );
      }
      markup += `</g>`;
    }

    // Uncomment to test one big curve
    // markup = this.addSection(
    //   0, 
    //   0, 
    //   this.height
    // );

    this.canvas.innerHTML = markup;
  }

  addSection = (col, row, size) => {
    let x = col * size;
    let y = row * size;
    let id = `clip-${row}-${col}`

    let markup = /* html */`
        <clipPath id="${id}">
          <rect
            x="${x}"
            y="${y}"
            width="${size}"
            height="${size}"
            stroke="${this.hue}"
            stroke-width="${this.strokeWidth}"
            fill="none"
          />
      </clipPath>
    `;
    for (let i = 0; i < this.lineCount; i++) {

      markup += /*html*/`
        <circle
          cx="${x + (this.lineCount * i)}"
          cy="${y + (this.lineCount * i)}"
          r="${size}"
          stroke="${this.hue}"
          stroke-width="${this.strokeWidth}"
          fill="none"
          clip-path="url(#${id})"
        />
      `;
    }

    return `<g>${markup}</g>`;
  }
}

customElements.define("sq-curves-2", SqCurves2);

