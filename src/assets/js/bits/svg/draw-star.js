import { nanoid } from '../../utils/nanoid.js'
import { random } from '../../utils/random.js'

export const drawStar = ({ size, cx, cy }) => {
  const starId = `star-${nanoid()}`;

  // We want red, blue and yellow stars
  // @see https://www.livescience.com/34469-purple-stars-green-stars-star-colors.html
  // We allow the following hues: 
  // - 0-60
  // - 200-250
  // - 340-360
  // This creates a range of 130 hue valus, split into three groups.
  // First get our location in the larger range
  let relativeStarHue = random(0, 130);
  // Then adjust the hue to the correct group
  if (relativeStarHue > 110) {
    relativeStarHue += 230;
  } else if (relativeStarHue > 60) {
    relativeStarHue += 140;
  }
  const starColor = `hsl(${relativeStarHue}, ${random(90, 100)}%, ${random(60, 70)}%)`;
  const glowColor = `hsl(${relativeStarHue}, ${random(80, 90)}%, ${random(40, 50)}%)`;

  const blurFilterSize = 5;

  return /* html */`
    <g class="star">
      <filter id="${starId}-main">
        <feTurbulence type="fractalNoise" baseFrequency="${0.75 / size * 30}" seed="${random(0, 100)}"/>
        <feDiffuseLighting lighting-color="${starColor}" surfaceScale="${100 * size}">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
        <feColorMatrix 
          type="saturate" 
          values="3"
        />
        <feComponentTransfer>
          <feFuncR type="linear" slope="100"/>
          <feFuncG type="linear" slope="100"/>
          <feFuncB type="linear" slope="100"/>
        </feComponentTransfer>
        <feComposite operator="in" in2="SourceGraphic"/>
        <feGaussianBlur stdDeviation="${size / 25}"/>
      </filter>
      
      <filter
        id="${starId}-glow" 
        filterUnits="userSpaceOnUse"
        x="${cx - size * blurFilterSize}" 
        y="${cy - size * blurFilterSize}" 
        height="${size * 2 * blurFilterSize}" 
        width="${size * 2 * blurFilterSize}"
      >
        <feGaussianBlur stdDeviation="${size / 5}"/>
      </filter>
      
      <filter
        id="${starId}-secondary-glow" 
        filterUnits="userSpaceOnUse"
        x="${cx - size * blurFilterSize}" 
        y="${cy - size * blurFilterSize}" 
        height="${size * 2 * blurFilterSize}" 
        width="${size * 2 * blurFilterSize}"
      >
        <feGaussianBlur stdDeviation="${size / 5}"/>
        <feColorMatrix 
          type="saturate" 
          values="10"
        />
      </filter>
      
      <filter
        id="${starId}-turbulent-glow" 
      >
        <feTurbulence baseFrequency="${0.75 / size * 10}" seed="${random(0, 100)}"/>
        <feDiffuseLighting lighting-color="${starColor}" surfaceScale="${1 * size}">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
        <feColorMatrix 
          type="saturate" 
          values="3"
        />
        <feComponentTransfer>
          <feFuncR type="linear" slope="100"/>
          <feFuncG type="linear" slope="100"/>
          <feFuncB type="linear" slope="100"/>
        </feComponentTransfer>
        <feComposite operator="in" in2="SourceGraphic"/>
        <feGaussianBlur stdDeviation="${size / 25}"/>
      </filter>

      <circle r="${size}" cx="${cx}" cy="${cy}" filter="url(#${starId}-glow)" fill="${glowColor}" opacity="0.7"/>
      <circle r="${size * 0.85}" cx="${cx}" cy="${cy}" filter="url(#${starId}-turbulent-glow)" fill="${glowColor}" opacity="0.7"/>
      <circle r="${size * 0.8}" cx="${cx}" cy="${cy}" fill="${starColor}"/>
      <circle r="${size * 0.75}" cx="${cx}" cy="${cy}" filter="url(#${starId}-main)" opacity="0.9"/>
      <circle r="${size * 0.7}" cx="${cx}" cy="${cy}" filter="url(#${starId}-secondary-glow)" fill="${glowColor}" opacity="0.6"/>
    </g>
  `;
}