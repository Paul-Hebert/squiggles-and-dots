import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

export class SqSquares extends SvgCanvas {
  name = "Squares";
  width = 100;
  height = this.width;

  draw = () => {
    this.hue = `hsl(
      ${random(0, 360)},
      ${random(40, 100)}%,
      ${random(20, 60)}%
    )`;

    let gridSize = Math.round(random(5, 15));
    let size = this.width/gridSize;
    
    let minLines = 5

    this.lineCount = Math.round(random(minLines, minLines + (size / 10)));
    let baseStrokeWidth = size / (this.lineCount * 10);
    this.strokeWidth = random(baseStrokeWidth * 0.5, baseStrokeWidth * 1.5);

    let markup = /*html*/`
      <rect
        width="${this.width}"
        height="${this.height}"
        stroke="${this.hue}"
        stroke-width="${this.strokeWidth * 2}"
        fill="none"
      />
    `;

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

    // Uncomment to test one big square
    // markup += this.addSection(
    //   0, 
    //   0, 
    //   this.width, 
    //   this.height
    // );

    this.canvas.innerHTML = markup;
  }

  addSection = (x, y, size) => {
    const cushion = size * 1 / 10;
    const innerPointX = random(cushion, size - cushion);
    const innerPointY = random(cushion, size - cushion);
    let markup = '';

    const endSize = this.strokeWidth;
    const sizeDifference = size - endSize;

    for(let i = 0; i < this.lineCount; i++) {
      const shrinkage = (i/this.lineCount) * sizeDifference;
      const currentSize = size - shrinkage;

      markup += /*html*/`
        <rect 
          x="${x + (innerPointX / this.lineCount * i)}"
          y="${y + (innerPointY / this.lineCount * i)}"
          width="${currentSize}"
          height="${currentSize}"
          stroke="${this.hue}"
          stroke-width="${this.strokeWidth}"
          fill="none"
        />
      `;
    }

    return `<g>${markup}</g>`;
  }
}

customElements.define("sq-squares", SqSquares);

