import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random, randomBool } from '../../assets/js/utils/random.js';
import { nanoid } from '../../assets/js/utils/nanoid.js';

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
    const relativeStarHue = random(0, 75);
    let adjustedStarHue = relativeStarHue - 10;
    if(adjustedStarHue < 0) adjustedStarHue += 360;
    this.starColor = `hsl(${adjustedStarHue}, ${random(90, 100)}%, ${random(70, 80)}%)`;
    
    this.planetMaxSize = 50

    this.cx = this.width / 2;
    this.cy = this.height / 2;

    let distance = this.starSize + this.randomOrbitDistance();
    const maxDistance = this.width / 2;
    this.planets = [];

    while (distance < maxDistance - this.planetMaxSize - 10) {
      this.planets.push({
        id: `planet-${nanoid()}`,
        radius: random(10, this.planetMaxSize),
        distance,
        speed: distance / (this.width / 2) * random(20, 30),
        startRotation: random(0, 360),
        isGas: randomBool(),
        primaryColor: `hsl(${random(0, 360)}, ${random(30, 100)}%, ${random(60, 80)}%)`,
        secondaryColor: `hsl(${random(0, 360)}, ${random(30, 100)}%, ${random(60, 80)}%)`
      });

      distance += this.randomOrbitDistance();
    }
  }

  randomOrbitDistance() {
    return random(this.planetMaxSize, 200);
  }

  drawSystem() {
    let markup = this.drawStar();

    this.planets.forEach(planet => {
      markup += this.drawPlanet(planet)
    });

    return markup;
  }

  drawStar() {
    const starId = `star-${nanoid()}`;
    return /* html */`
      <g class="star">
        <filter id="${starId}">
          <feTurbulence type="fractalNoise" baseFrequency="100" seed="${random(0, 100)}"/>
          <feDiffuseLighting lighting-color="${this.starColor}" surfaceScale="100">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feComposite operator="in" in2="SourceGraphic"/>
          <feGaussianBlur stdDeviation="15"/>
          <feColorMatrix 
            type="saturate" 
            values="3"
          />
          <feComponentTransfer>
            <feFuncR type="linear" slope="50"/>
            <feFuncG type="linear" slope="50"/>
            <feFuncB type="linear" slope="50"/>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="5"/>
        </filter>
        <circle r="${this.starSize}" cx="${this.cx}" cy="${this.cy}" filter="url(#${starId})"/>
      </g>
    `;
  }

  drawPlanet(config) {
    const orbitPath = /* html */`
      <circle r="${config.distance}" cx="${this.cx}" cy="${this.cy}" fill="none" stroke="#888"/>
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
        <filter id="${config.id}-texture">
          <feTurbulence
            ${config.isGas ? 'type="fractalNoise"' : ''} 
            baseFrequency="${random(0, 0.1)} ${random(0, 0.5)}"
            seed="${random(0, 100)}"
          />
          <feDiffuseLighting lighting-color="${config.primaryColor}" surfaceScale="${random(1, 5)}">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feComposite operator="in" in2="SourceGraphic"/>
          <feGaussianBlur stdDeviation="1"/>
        </filter>
        <circle
          r="${config.radius}" 
          cx="${this.cx}" 
          cy="${this.cy}"
          fill="#fff"
        />
        <circle
          r="${config.radius}" 
          cx="${this.cx}" 
          cy="${this.cy}"
          fill="#000"
          filter="url(#${config.id}-texture)"
          opacity="${random(0.6, 1)}";
        />
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

