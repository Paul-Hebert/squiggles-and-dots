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

    let gridSize = random(5, 15);
    let size = this.width/gridSize;
    
    let minLines = 5

    this.lineCount = Math.round(random(minLines, minLines + (size / 10)));
    let baseStrokeWidth = size / (this.lineCount * 10);
    this.strokeWidth = random(baseStrokeWidth * 0.5, baseStrokeWidth * 1.5);

    let markup = '';

    for(let row = 0; row < gridSize; row++) {
      for(let col = 0; col < gridSize; col++) {
        markup += this.addSection(
          col * size, 
          row * size, 
          size, 
          size
        );
      }
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
    const innerPoint = random(cushion, size - cushion);
    let markup = '';

    const endSize = this.strokeWidth;
    const sizeDifference = size - endSize;
    console.log('sizeDifference', sizeDifference)

    for(let i = 0; i < this.lineCount; i++) {
      const shrinkage = (i/this.lineCount) * sizeDifference;
      const currentSize = size - shrinkage;
      console.log(shrinkage, currentSize);

      markup += /*html*/`
        <rect 
          x="${x + (innerPoint / this.lineCount * i)}"
          y="${y + (innerPoint / this.lineCount * i)}"
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

