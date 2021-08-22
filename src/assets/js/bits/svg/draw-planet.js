import { nanoid } from '../../utils/nanoid.js'
import { random, randomBool } from '../../utils/random.js'

export const drawPlanet = ({ cx, cy, size }) => {
  const id = `planet-${nanoid()}`;
  const isGas = randomBool();
  const primaryColor = `hsl(${random(0, 360)}, ${random(30, 100)}%, ${random(60, 80)}%)`;

  return /* html */`
    <filter id="${id}-texture">
      <feTurbulence
        ${isGas ? 'type="fractalNoise"' : ''} 
        baseFrequency="${random(0, 0.1)} ${random(0, 0.5)}"
        seed="${random(0, 100)}"
      />
      <feDiffuseLighting lighting-color="${primaryColor}" surfaceScale="${random(1, 5)}">
        <feDistantLight azimuth="45" elevation="60" />
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
      opacity="${random(0.6, 1)}";
    />
  `
}