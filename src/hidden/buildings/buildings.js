import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

export class SqBuildings extends SvgCanvas {
  name = "Buildings";
  width = 200;
  height = 100;
  scaleUnit = 10;

  draw = () => {
    let markup = '';

    let xPos = 0; 
    while (xPos < this.width - this.scaleUnit) {
      let width = Math.round(random(1, 5)) * this.scaleUnit;

      if (xPos + width > this.width) {
        width = this.width - xPos;
      }

      if (Math.random() < 0.75) {
        markup += this.addBuilding(xPos, width)
      }

      xPos += width;
    }

    this.canvas.innerHTML = markup;
  }

  addBuilding = (xPos, width) => {
    const height = Math.round(random(3, 8)) * this.scaleUnit;
    const roofHeight = Math.round(random(1, 2) * this.scaleUnit);
    const bodyHeight = height - roofHeight;

    return this.drawRoof({
      xPos,
      width,
      yPos: this.height - height + roofHeight,
      height: roofHeight
    }) + this.drawWalls({
      xPos,
      width,
      yPos: this.height - bodyHeight,
      height: bodyHeight
    })
  }

  drawRoof({xPos, yPos, width, height}) {
    if(Math.random() > 0.5) {
      return /* html */`
        <ellipse
          cx="${xPos + width / 2}"
          cy="${yPos}""
          rx="${width / 2}"
          ry=${height}
          fill="#fff"
          stroke="#ccc"/>
      `;
    } else {
      return /* html */`
        <path
          d="
            M ${xPos},${yPos} 
            l ${width / 2},${height * -1}
            l ${width / 2},${height}
            Z
          "
          fill="#fff"
          stroke="#ccc"/>
      `;
    }
  }

  drawWalls({xPos, yPos, width, height}) {
    return /* html */`
      <rect
        x="${xPos}" 
        width="${width}" 
        y="${yPos}" 
        height="${height}"
        fill="#fff"
        stroke="#ccc"/>
    `;
  }
}

customElements.define("sq-buildings", SqBuildings);

