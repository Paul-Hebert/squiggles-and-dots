import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';
import { nanoid } from '../../assets/js/utils/nanoid.js';

export class SqCurves3 extends SvgCanvas {
  name = "SqCurves3";
  width = 100;
  height = this.width;

  draw = () => {
    this.stroke = `hsl(
      ${random(0, 360)},
      ${random(10, 100)}%,
      ${random(20, 80)}%
    )`;

    let gridSize = Math.round(random(5, 15));
    let size = this.width/gridSize;
    
    let minLines = 5

    this.lineCount = Math.round(random(minLines, minLines + (size / 10)));
    let baseStrokeWidth = size / (this.lineCount * 5);
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
    let id = `clip-${nanoid()}-${row}-${col}`

    let centerX = x + (size / 2);
    let centerY = y + (size / 2);

    let markup = /* html */`
        <clipPath id="${id}">
          <rect
            x="${x - this.strokeWidth / 2}"
            y="${y - this.strokeWidth / 2}"
            width="${size + this.strokeWidth}"
            height="${size + this.strokeWidth}"
            fill="none"
          />
      </clipPath>
    `;

    const isLine = random(0, 4) < 1;

    const sharedAttributes = `
      stroke="${this.stroke}"
      stroke-width="${this.strokeWidth}"
      clip-path="url(#${id})"
      fill="none"
    `

    for (let i = this.lineCount; i >= 0; i--) {
      const fractionSize = (i / this.lineCount) * size;

      if (isLine) {
        markup += /*html*/`
          <line
            x1="${x}"
            x2="${x + size}"
            y1="${y + fractionSize}"
            y2="${y + fractionSize}"
            ${sharedAttributes}
          />
        `;
      } else {
        markup += /*html*/`
          <circle
            cx="${x}"
            cy="${y}"
            r="${fractionSize}"
            ${sharedAttributes}
          />
        `;
      }
    }

    // Uncomment to test without rotations
    // return `<g
    // >${markup}</g>`;

    return `<g
      transform="rotate(${90 * Math.round(random(0, 3))} ${centerX} ${centerY})"
    >${markup}</g>`;
  }
}

customElements.define("sq-curves-3", SqCurves3);

