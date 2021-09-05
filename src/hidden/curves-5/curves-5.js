import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random, randomBool, randomItemInArray } from '../../assets/js/utils/random.js';
import { nanoid } from '../../assets/js/utils/nanoid.js';

export class SqCurves5 extends SvgCanvas {
  name = "SqCurves5";
  width = 100;
  height = this.width;

  draw = () => {
    this.initConfigs();
    
    let markup = this.buildTiles(this.size);

    let state = {
      x: 0,
      y: 0,
      axis: 'x',
      trend: 1,
    }
    const count = 500;

    for (let i = 0; i < count; i++) {
      let nextState = this.getNextPosition(state); 

      markup += this.addSection({
        col: state.x,
        row: state.y,
        isLine: nextState.isLine,
        rotate: nextState.rotate,
        count: i
      });

      this.grid[state.y][state.x] = this.grid[state.y][state.x] + 1;

      state = nextState;
    }

    this.canvas.innerHTML = markup;
  }

  getNextPosition(state) {
    let possiblePositions = [];

    if (state.axis === 'x') {
      if (state.y > 0) {
        // turn up
        possiblePositions.push({
          nickname: 'turn up',
          y: state.y - 1,
          x: state.x,
          axis: 'y',
          trend: -1,
          isLine: false,
          rotate: state.trend === 1 ? 0 : 90
        });
      }
      if (state.y < this.gridSize - 1) {
        // turn down
        possiblePositions.push({
          nickname: 'turn down',
          y: state.y + 1,
          x: state.x,
          axis: 'y',
          trend: 1,
          isLine: false,
          rotate: state.trend === 1 ? 270 : 180
        });
      }
      if ((state.x < this.gridSize - 1 && state.x > 0)) {
        // go straight (horizontally)
        possiblePositions.push({
          nickname: 'straight horizontal',
          y: state.y,
          x: state.x + state.trend,
          axis: 'x',
          trend: state.trend,
          isLine: true,
          rotate: 0
        });
      }
    } else {
      if (state.x > 0) {
        // turn left
        possiblePositions.push({
          nickname: 'turn left',
          x: state.x - 1,
          y: state.y,
          axis: 'x',
          trend: -1,
          isLine: false,
          rotate: state.trend === 1 ? 0 : 270
        });
      }
      if (state.x < this.gridSize - 1) {
        // turn right
        possiblePositions.push({
          nickname: 'turn right',
          x: state.x + 1,
          y: state.y,
          axis: 'x',
          trend: 1,
          isLine: false,
          rotate: state.trend === 1 ? 90 : 180
        });
      }
      if ((state.y < this.gridSize - 1 && state.y > 0)) {
        // go straight (vertically)
        possiblePositions.push({
          nickname: 'straight vertical',
          x: state.x,
          y: state.y + state.trend,
          axis: 'y',
          trend: state.trend,
          isLine: true,
          rotate: 90
        });
      }
    }
    
    // TODO: Confirm this is working
    // It should be giving preference to squares that have been visited less often
    // Is this having the unintended side-effect of walling off areas?
    let minRepetitions = null;

    possiblePositions.forEach(position => {
      const repetitions = this.grid[position.y][position.x];
      if (minRepetitions === null) {
        minRepetitions = repetitions
      } else if (repetitions < minRepetitions) {
        minRepetitions = repetitions;
      }
    });

    possiblePositions.filter(position => {
      const repetitions = this.grid[position.y][position.x];

      return repetitions === minRepetitions;
    })
    
    return randomItemInArray(possiblePositions)
  }

  addSection = ({ col, row, isLine, rotate, count}) => {
    let x = col * this.size;
    let y = row * this.size;

    let centerX = x + (this.size / 2);
    let centerY = y + (this.size / 2);

    const transform = `transform="rotate(${rotate} ${centerX} ${centerY})"`

    const useId = isLine ? this.straightId : this.curveId;

    return /*html*/`<use x="${x}" y="${y}" xlink:href="#${useId}" ${transform}/>`;
  }

  buildTiles() {
    let straightLines = '';
    let curveLines = /*html*/`
      <path
        d="M0,${this.size} L${this.size},0 L0,0 Z"
        fill="#fff"
      />

    `;
    const sharedAttributes = `
      stroke="${this.stroke}"
      stroke-width="${this.strokeWidth}"
      stroke-linecap="round"
    `

    for (let i = this.lineCount; i >= 0; i--) {
      const halfStroke = this.strokeWidth / 2;
      const fractionSize = halfStroke + (i / this.lineCount) * (this.size - this.strokeWidth);

      straightLines += /*html*/`
        <line
          x1="0"
          x2="${0 + this.size}"
          y1="${fractionSize}"
          y2="${fractionSize}"
          id="${this.straightId}"
          fill="none"
          ${sharedAttributes}
        />
      `;
      curveLines += /*html*/`
        <path
          d="M0,${fractionSize} L${fractionSize},0"
          fill="none"
          ${sharedAttributes}/>
      `;
    }

    return /*html*/`
      <defs>
        <g id="${this.straightId}">
          <rect
            x="0"
            y="0"
            width="${this.size}"
            height="${this.size}"
            fill="#fff"
          />
          ${straightLines}
        </g>
        <g id="${this.curveId}">
          ${curveLines}
        </g>
      </defs>
    `;
  }

  initConfigs() {
    this.stroke = `hsl(
      ${random(0, 360)},
      ${random(10, 100)}%,
      ${random(20, 50)}%
    )`;

    this.gridSize = Math.round(random(8, 12));
    this.size = this.width / this.gridSize;

    this.grid = [];

    for (let i = 0; i < this.gridSize; i++) {
      this.grid.push([]);
      
      for (let x = 0; x < this.gridSize; x++) {
        this.grid[i].push(0);
      }
    }
    
    let minLines = 5

    this.lineCount = Math.round(random(minLines, minLines + (this.size / 10)));
    let baseStrokeWidth = this.size / (this.lineCount * 5);
    this.strokeWidth = random(baseStrokeWidth * 0.5, baseStrokeWidth * 1.5);

    this.straightId = 'line-' + nanoid();
    this.curveId = 'curve-' + nanoid();
  }
}

customElements.define("sq-curves-5", SqCurves5);

