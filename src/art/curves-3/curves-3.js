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
      ${random(20, 50)}%
    )`;

    let gridSize = Math.round(random(5, 15));
    let size = this.width/gridSize;
    
    let minLines = 5

    this.lineCount = Math.round(random(minLines, minLines + (size / 10)));
    let baseStrokeWidth = size / (this.lineCount * 5);
    this.strokeWidth = random(baseStrokeWidth * 0.5, baseStrokeWidth * 1.5);

    this.straightId = 'a' + nanoid();
    this.curveId = 'a' + nanoid();
    const clipId = 'a' + nanoid();

    const clipPath = `
      <clipPath id="${clipId}">
        <rect
          x="${this.strokeWidth / -2}"
          y="${this.strokeWidth / -2}"
          width="${size + this.strokeWidth}"
          height="${size + this.strokeWidth}"
        />
      </clipPath>
    `;
    
    let straightLines = '';
    let curveLines = '';
    const sharedAttributes = `
      stroke="${this.stroke}"
      stroke-width="${this.strokeWidth}"
    `

    for (let i = this.lineCount; i >= 0; i--) {
      const fractionSize = (i / this.lineCount) * size;

      straightLines += /*html*/`
        <line
          x1="0"
          x2="${0 + size}"
          y1="${fractionSize}"
          y2="${fractionSize}"
          id="${this.straightId}"
          fill="none"
          ${sharedAttributes}
        />
      `;
      curveLines += /*html*/`
        <circle
          cx="0"
          cy="0"
          r="${fractionSize}"
          ${sharedAttributes}
          fill="#fff"
        />
      `;
    }

    let markup = /*html*/`
      <defs>
        ${clipPath}
        <g clip-path="url(#${clipId})" id="${this.straightId}">
          <rect
            x="0"
            y="0"
            width="${size}"
            height="${size}"
            fill="#fff"
          />
          ${straightLines}
        </g>
        <g clip-path="url(#${clipId})" id="${this.curveId}">
          ${curveLines}
        </g>
      </defs>
    `;

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

    this.canvas.innerHTML = markup;
  }

  addSection = (col, row, size) => {
    let x = col * size;
    let y = row * size;

    let centerX = x + (size / 2);
    let centerY = y + (size / 2);

    const transform = `transform="rotate(${90 * Math.round(random(0, 3))} ${centerX} ${centerY})"`

    const isLine = random(0, 4) < 1;
    const useId = isLine ? this.straightId : this.curveId;

    return /*html*/`
      <use x="${x}" y="${y}" xlink:href="#${useId}" ${transform} />
    `;
    }
}

customElements.define("sq-curves-3", SqCurves3);

