import { nanoid } from '../../utils/nanoid.js'
import { random, randomBool } from '../../utils/random.js'

export const drawPlanet = ({ cx, cy, size }) => {
  const id = `planet-${nanoid()}`;
  const isGas = randomBool();
  const hue = random(0, 360);
  const primaryColor = `hsl(${hue}, ${random(70, 100)}%, ${random(70, 90)}%)`;

  const scale = size;

  return /* html */`
    <defs>
      <radialGradient id="${id}-shadow">
        <stop offset="0%" stop-color="hsla(0, 0%, 0%, 0)" />
        <stop offset="80%" stop-color="hsla(0, 0%, 0%, 1)" />
      </radialGradient>
      <clipPath id="${id}-clip">
        <circle 
          r="${size + 2}" 
          cx="${cx}" 
          cy="${cy}"
        />
      </clipPath>
    </defs>
    <filter id="${id}-texture">
      <feTurbulence
        ${isGas ? 'type="fractalNoise"' : "" }
        baseFrequency="${random(0.5, 2) / scale} ${random(2, 4) / scale}"
        seed="${random(0, 100)}"
        numOctaves="${Math.round(random(2, 10))}"
      />
      <feDiffuseLighting lighting-color="${primaryColor}" surfaceScale="${random(1, 10)}">
        <feDistantLight azimuth="${45}" elevation="${60}" />
      </feDiffuseLighting>
      <feComposite operator="in" in2="SourceGraphic"/>
      <feGaussianBlur stdDeviation="1"/>
    </filter>
    <circle
      r="${size}" 
      cx="${cx}" 
      cy="${cy}"
      fill="#fff"
    />
    <circle
      r="${size}" 
      cx="${cx}" 
      cy="${cy}"
      fill="#000"
      filter="url(#${id}-texture)"
    />
    <circle
      fill="url(#${id}-shadow)"
      r="${size * 2 + 2}"
      cx="${cx - size}" 
      cy="${cy}"
      clip-path="url(#${id}-clip)"
    />
  `
}