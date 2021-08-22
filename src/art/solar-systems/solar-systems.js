import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';
import { drawStar } from '../../assets/js/bits/svg/draw-star.js';
import { drawPlanet } from '../../assets/js/bits/svg/draw-planet.js';
import { drawStarField } from '../../assets/js/bits/svg/draw-star-field.js';

export class SolarSystems extends SvgCanvas {
  name = "Solar Systems";
  width = 1000;
  height = 1000;
  refreshRate = 1000;

  draw = () => {
    this.canvas.style.backgroundColor = '#000';

    this.createConfigs();

    this.canvas.innerHTML = this.drawSystem() + this.globalCSS();
  }

  createConfigs() {
    this.starSize = random(70, 120);
    this.planetMaxSize = 50

    this.cx = this.width / 2;
    this.cy = this.height / 2;

    let distance = this.starSize + this.randomOrbitDistance();
    const maxDistance = this.width / 2;
    this.planets = [];

    while (distance < maxDistance - this.planetMaxSize - 10) {
      this.planets.push({
        size: random(10, this.planetMaxSize),
        distance,
        speed: distance / (this.width / 2) * random(20, 30),
        startRotation: random(0, 360),
      });

      distance += this.randomOrbitDistance();
    }
  }

  randomOrbitDistance() {
    return random(this.planetMaxSize, 200);
  }

  drawSystem() {
    // TODO: Move to star field bit
    let markup = drawStarField({ width: this.width, height: this.height });
    
    markup += drawStar({
      size: this.starSize,
      cx: this.cx,
      cy: this.cy
    });

    this.planets.forEach(planet => {
      markup += this.drawPlanet({
        cx: this.cx,
        cy: this.cy,
        ...planet
      })
    });

    return markup;
  }

  drawPlanet(config) {
    const orbitPath = /* html */`
      <circle
        r="${config.distance}" 
        cx="${this.cx}" 
        cy="${this.cy}"
        fill="none"
        stroke="hsla(0, 0%, 100%, 0.5)"/>
    `
    
    const planet = /* html */`
      <g 
        style="
          --distance: ${config.distance}px;
          --speed: ${config.speed}s;
          --start-rotation: ${config.startRotation}deg;
        "
        class="orbit"
      >
        ${drawPlanet(config)}
      </g>
    `;

    return /* html */`
      <g class="planet">
        ${orbitPath}
        ${planet}
      </g>
    `;
  }

  globalCSS = () => /* html */`
    <style>
      @keyframes orbit {
        from {
          transform: rotate(var(--start-rotation)) translateX(var(--distance));
        }

        to {
          transform: rotate(calc(var(--start-rotation) + 360deg)) translateX(var(--distance)) ;
        }
      }

      .orbit {
        transform-origin: ${this.cx}px ${this.cy}px;
        animation: orbit var(--speed) linear infinite;
        animation-delay: var(--delay);
      }
    </style>
  `;
}

customElements.define("sq-solar-systems", SolarSystems);

