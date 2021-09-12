import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

export class SqBuildings extends SvgCanvas {
  name = "Buildings";
  width = 200;
  height = 100;
  height = 100;
  scaleUnit = 10;
  scaleWidth = this.width/this.scaleUnit;
  scaleHeight = this.width/this.scaleUnit;

  draw = () => {
    let markup = '';

    let buildingSize = Math.round(random(2, 5));
    let xPos = Math.round(random(1, this.scaleWidth - buildingSize - 1)); 

    for (let i = 0; i < buildingSize; i++) {
      let width = 2;

      markup += this.addBuilding(xPos, width)

      xPos += width * this.scaleWidth / 2;
    }

    this.canvas.innerHTML = markup;
  }

  addBuilding = (xPos, width) => {
    const height = Math.round(random(3, 8)) * this.scaleUnit;
    const roofHeight = Math.round(random(1, 2) * this.scaleUnit);
    const bodyHeight = height - roofHeight;

    return this.drawRoof({
      xPos,
      width: width * this.scaleUnit,
      yPos: this.height - height + roofHeight,
      height: roofHeight
    }) + this.drawWalls({
      xPos,
      width: width * this.scaleUnit,
      yPos: this.height - bodyHeight,
      height: bodyHeight
    }) + this.drawDoor({
      xPos,
      width: width * this.scaleUnit,
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

  drawDoor({xPos, width}) {
    const doorHeight = this.scaleUnit * 3/2;
    const doorWidth = this.scaleUnit * 2/3;
    return /* html */`
      <rect
        x="${(xPos + width / 2) - doorWidth / 2}" 
        width="${doorWidth}" 
        y="${this.height - doorHeight}" 
        height="${doorHeight}"
        fill="#fff"
        stroke="#ccc"/>
    `;
  }
}

customElements.define("sq-buildings", SqBuildings);

