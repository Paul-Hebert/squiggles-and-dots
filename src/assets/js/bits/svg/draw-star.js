import { nanoid } from '../../utils/nanoid.js'
import { random } from '../../utils/random.js'

export const drawStar = ({ size, cx, cy }) => {
  const starId = `star-${nanoid()}`;

  const relativeStarHue = random(0, 210);
  // TODO: this doesn't work quite right
  // This allows purples stars, which are kinda not a thing?
  //  https://www.livescience.com/34469-purple-stars-green-stars-star-colors.html
  let adjustedStarHue = relativeStarHue - 150;
  if(adjustedStarHue < 0) adjustedStarHue += 360;
  const starColor = `hsl(${adjustedStarHue}, ${random(90, 100)}%, ${random(70, 80)}%)`;

  return /* html */`
    <g class="star">
      <filter id="${starId}">
        <feTurbulence type="fractalNoise" baseFrequency="100" seed="${random(0, 100)}"/>
        <feDiffuseLighting lighting-color="${starColor}" surfaceScale="100">
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
      <circle r="${size}" cx="${cx}" cy="${cy}" filter="url(#${starId})"/>
    </g>
  `;
}