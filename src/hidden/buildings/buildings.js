import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random, randomBool } from '../../assets/js/utils/random.js';

export class SqBuildings extends SvgCanvas {
  name = "Buildings";

  width = 1000;
  height = 500;
  scaleUnit = 50;
  scaleWidth = this.width/this.scaleUnit;
  scaleHeight = this.width/this.scaleUnit;

  strokeFilter = `url('#pencilTexture3')`;
  strokeWidth = 2;

  draw = () => {
    this.hue = random(0, 360);
    this.strokeColor = `hsl(
      ${this.hue},
      ${random(0, 50)}%,
      ${random(10, 60)}%
    )`;
    this.fillColor = `hsl(
      ${this.hue},
      ${random(20, 50)}%,
      ${random(95, 100)}%
    )`;
    this.flagColor = `hsl(
      ${this.hue},
      ${random(80, 100)}%,
      ${random(40, 60)}%
    )`;

    let markup = this.defs;

    let buildingSize = Math.round(random(2, 5));
    let xPos = Math.round(random(1, this.scaleWidth - buildingSize - 1)); 

    for (let i = 0; i < buildingSize; i++) {
      let width = 2;

      markup += this.addBuilding(xPos, width)

      xPos += width;
    }

    this.canvas.innerHTML = markup;
  }

  addBuilding = (xPos, width) => {
    const height = Math.round(random(3, 8)) * this.scaleUnit;
    const roofHeight = this.scaleUnit;
    const bodyHeight = height - roofHeight;

    return this.drawRoof({
      xPos: xPos * this.scaleUnit,
      width: width * this.scaleUnit,
      yPos: this.height - height + roofHeight,
      height: roofHeight
    }) + this.drawWalls({
      xPos: xPos * this.scaleUnit,
      width: width * this.scaleUnit,
      yPos: this.height - bodyHeight,
      height: bodyHeight
    }) + this.drawDoor({
      xPos: xPos * this.scaleUnit,
      width: width * this.scaleUnit,
    })
  }

  drawRoof({ xPos, yPos, width, height }) {
    let roof;
    if(Math.random() > 0.5) {
      roof = /* svg */`
        <ellipse
          cx="${xPos + width / 2}"
          cy="${yPos}"
          rx="${width / 2}"
          ry="${height}"
          fill="${this.fillColor}"
          stroke="none"/>
        <ellipse
          cx="${xPos + width / 2}"
          cy="${yPos}"
          rx="${width / 2}"
          ry="${height}"
          fill="none"
          stroke="${this.strokeColor}"
          stroke-width="${this.strokeWidth}"
          filter="${this.strokeFilter}"
          />
      `;
    } else {
      roof = /* svg */`
        <path
          d="
            M ${xPos},${yPos} 
            l ${width / 2},${height * -1}
            l ${width / 2},${height}
            Z
          "
          fill="${this.fillColor}"
          />
        <path
          d="
            M ${xPos},${yPos} 
            l ${width / 2},${height * -1}
            l ${width / 2},${height}
            Z
          "
          fill="none"
          stroke="${this.strokeColor}"
          stroke-width="${this.strokeWidth}"
          filter="${this.strokeFilter}"
          />
      `;
    }

    if (Math.random() > 0.8) {
      roof += this.drawFlag({ xPos, yPos, width, height });
    }

    return roof;
  }

  drawFlag({ xPos, yPos, width, height }) {
    const direction = randomBool() ? 1 : -1;
    return /* svg */`
      <rect
        y="${yPos - height * 2}"
        height="${height}"
        x="${xPos + width / 2 - 0.5}"
        width="1"
        fill="none"
        stroke="${this.strokeColor}"
        stroke-width="${this.strokeWidth}"
        filter="${this.strokeFilter}" />
      <path
        stroke="none"
        fill="${this.flagColor}"
        d="
          M${xPos + width / 2 - 0.5},${yPos - height * 2}
          l${width / 4 * direction},0
          l${width / 8 * direction * -1},${height / 8}
          l${width / 8 * direction},${height / 8}
          l${width / 4 * direction * -1},0
          Z
        "/>
      <path
        fill="none"
        stroke="${this.strokeColor}"
        d="
          M${xPos + width / 2 - 0.5},${yPos - height * 2}
          l${width / 4 * direction},0
          l${width / 8 * direction * -1},${height / 8}
          l${width / 8 * direction},${height / 8}
          l${width / 4 * direction * -1},0
          Z
        "
        filter="${this.strokeFilter}"
        stroke-width="${this.strokeWidth}"/>
    `;
  }

  drawWalls({xPos, yPos, width, height}) {
    return /* svg */`
      <rect
        x="${xPos}" 
        width="${width}" 
        y="${yPos}" 
        height="${height}"
        fill="${this.fillColor}"
        stroke="none"/>
      <rect
        x="${xPos}" 
        width="${width}" 
        y="${yPos}" 
        height="${height}"
        fill="none"
        stroke="${this.strokeColor}"
        stroke-width="${this.strokeWidth}"
        filter="${this.strokeFilter}"
        />
    `;
  }

  drawDoor({xPos, width}) {
    const doorHeight = this.scaleUnit * 3/2;
    const doorWidth = this.scaleUnit * 2/3;
    return /* svg */`
      <rect
        x="${(xPos + width / 2) - doorWidth / 2}" 
        width="${doorWidth}" 
        y="${this.height - doorHeight}" 
        height="${doorHeight}"
        fill="${this.fillColor}"
        stroke="none"/>
      <rect
        x="${(xPos + width / 2) - doorWidth / 2}" 
        width="${doorWidth}" 
        y="${this.height - doorHeight}" 
        height="${doorHeight}"
        fill="${this.strokeColor}"
        opacity="0.2"
        stroke="none"/>
      <rect
        x="${(xPos + width / 2) - doorWidth / 2}" 
        width="${doorWidth}" 
        y="${this.height - doorHeight}" 
        height="${doorHeight}"
        fill="none"
        stroke="${this.strokeColor}"
        stroke-width="${this.strokeWidth}"
        filter="${this.strokeFilter}"
        />
    `;
  }

  // TODO: Remove extra filters
  // TODO: Improve filrers
  // https://heredragonsabound.blogspot.com/2020/02/creating-pencil-effect-in-svg.html
  // https://codepen.io/srt19170/pen/oNNQmRw?editors=1010
  defs = /* svg */`
    <defs>
      <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="roughPaper">
        <feTurbulence type="fractalNoise" baseFrequency="128" numOctaves="1" result="noise"></feTurbulence>
        <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="1" result="diffLight">
          <feDistantLight azimuth="45" elevation="55"></feDistantLight>
        </feDiffuseLighting>
        <feGaussianBlur in="diffLight" stdDeviation="0.75" result="dlblur"></feGaussianBlur>
        <feComposite operator="arithmetic" k1="1.2" k2="0" k3="0" k4="0" in="dlblur" in2="SourceGraphic" result="out"></feComposite>
      </filter>
      
      <filter x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="PencilTexture">
        <feTurbulence type="fractalNoise" baseFrequency="5" numOctaves="10" result="noise"></feTurbulence>
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" result="newSource"></feDisplacementMap>
      </filter>
    <filter  x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="pencilTexture2">
        <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="5" stitchTiles="stitch" result="f1">
        </feTurbulence>
        <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="f2">
        </feColorMatrix>
        <feComposite operator="in" in2="f2" in="SourceGraphic" result="f3">
        </feComposite>
    </filter>
    <filter  x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="pencilTexture3">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="5" stitchTiles="stitch" result="f1">
        </feTurbulence>
        <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="f2">
        </feColorMatrix>
        <feComposite operator="in" in2="f2b" in="SourceGraphic" result="f3">
        </feComposite>
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise">
        </feTurbulence>
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="2.5" in="f3" result="f4">
        </feDisplacementMap>
    </filter>
    <filter x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="pencilTexture4">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="1" result="f1">
        </feTurbulence>
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceGraphic" in2="f1" result="f4">
        </feDisplacementMap>
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="10" result="f2">
        </feTurbulence>
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceGraphic" in2="f2" result="f5">
        </feDisplacementMap>
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="100" result="f3">
        </feTurbulence>
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" in2="f3" result="f6">
        </feDisplacementMap>
        <feBlend mode="multiply" in2="f4" in="f5" result="out1">
        </feBlend>
        <feBlend mode="multiply" in="out1" in2="f6" result="out2">
        </feBlend>
    </filter>
    </defs>
  `;
}

customElements.define("sq-buildings", SqBuildings);

