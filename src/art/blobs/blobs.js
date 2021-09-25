import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';
import { nanoid } from '../../assets/js/utils/nanoid.js';

export class SqBlobs extends SvgCanvas {
  name = "Blobs";
  width = 200;
  height = 200;

  id = nanoid();

  constructor() {
    super();
  }

  draw = () => {
    const hue = Math.round(random(0, 360))

    this.defs.innerHTML = `
      <pattern id="${this.id}-pattern" patternUnits="userSpaceOnUse" width="4" height="4">
        <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="currentcolor" />
      </pattern>

      <filter id="${this.id}-goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        <feColorMatrix
          values="1 0 0 0 0 
                  0 1 0 0 0 
                  0 0 1 0 0 
                  0 0 0 30 -7"
        />
      </filter>

      <filter id="${this.id}-water-color">
        <feTurbulence type="turbulence" baseFrequency="0.05 0.05" numOctaves="1" seed="3" stitchTiles="stitch" result="turbulence"/>
        <feComposite in="turbulence" in2="SourceGraphic" operator="in" result="composite"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0
      0 1 0 0 0
      0 0 1 0 0
      0 0 0 25 -2" in="composite" result="colormatrix"/>
        <feComposite in="SourceGraphic" in2="colormatrix" operator="in" result="composite1"/>
        <feGaussianBlur stdDeviation="3 3" in="composite1" edgeMode="none" result="blur"/>
        <feSpecularLighting surfaceScale="2" specularConstant="1" specularExponent="20" lighting-color="#fffffd" in="blur" result="specularLighting">
              <feDistantLight azimuth="-90" elevation="150"/>
          </feSpecularLighting>
        <feSpecularLighting surfaceScale="2" specularConstant="1" specularExponent="20" lighting-color="#cae1fe" in="blur" result="specularLighting1">
              <feDistantLight azimuth="90" elevation="150"/>
          </feSpecularLighting>
        <feSpecularLighting surfaceScale="7" specularConstant="1" specularExponent="35" lighting-color="#fcfeff" in="blur" result="specularLighting2">
              <fePointLight x="150" y="50" z="300"/>
          </feSpecularLighting>
        <feComposite in="specularLighting" in2="composite1" operator="in" result="composite2"/>
        <feComposite in="specularLighting2" in2="composite1" operator="in" result="composite3"/>
        <feComposite in="specularLighting1" in2="composite1" operator="in" result="composite4"/>
        <feBlend mode="multiply" in="composite4" in2="SourceGraphic" result="blend"/>
        <feBlend mode="color-dodge" in="composite2" in2="blend" result="blend1"/>
        <feBlend mode="soft-light" in="composite3" in2="blend1" result="blend2"/>      </filter>
    `;

    let blobs1 = /* svg */``;

    for(let i = 0; i < random(100, 300); i++) {
      blobs1 += `
        <circle 
          cx="${Math.round(random(0, this.width))}"
          cy="${Math.round(random(0, this.height))}"
          r="${Math.round(random(3, 15))}"
          fill="hsl(${hue}, ${Math.round(random(40, 60))}%, ${Math.round(random(40, 60))}%)"
        />
      `
    }

    let blobs2 = /* svg */``;

    for(let i = 0; i < random(100, 300); i++) {
      blobs2 += `
        <circle 
          cx="${Math.round(random(0, this.width))}"
          cy="${Math.round(random(0, this.height))}"
          r="${Math.round(random(3, 15))}"
          fill="hsl(${hue}, ${Math.round(random(40, 60))}%, ${Math.round(random(40, 60))}%)"
        />
      `
    }

    this.svg.style.backgroundColor = `hsl(${hue}, ${Math.round(random(40, 60))}%, ${Math.round(random(40, 60))}%`;

    this.canvas.innerHTML = /* svg */`
      <rect x="0" y="0" width="100%" height="100%" fill="url(#${this.id}-pattern)" opacity="0.3"/>
      <g filter="url(#${this.id}-goo)">
        ${blobs1}
      </g>
      <g filter="url(#${this.id}-water-color)">
        ${blobs2}
      </g>
    `;
  }
}

customElements.define("sq-blobs", SqBlobs);

