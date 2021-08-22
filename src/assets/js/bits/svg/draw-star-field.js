import { nanoid } from '../../utils/nanoid.js'
import { random } from '../../utils/random.js'

export const drawStarField = () => {
  let id = `star-field-${nanoid()}`;
  return /* html */`
    <defs>
      <radialGradient id="${id}-gradient-1">
        <stop offset="0%" stop-color="hsla(${random(0, 360)}, 100%, 20%, 1)" />
        <stop offset="100%" stop-color="hsla(${random(0, 360)}, 100%, 20%, 1)" />
      </radialGradient>
    </defs>
    <rect x="-100%" y="-200%" width="300%" height="500%" fill="url(#${id}-gradient-1)" opacity="0.3"/>
    <defs>
      <radialGradient id="${id}-gradient-2">
        <stop offset="0%" stop-color="hsla(${random(0, 360)}, 100%, 20%, 1)" />
        <stop offset="100%" stop-color="hsla(${random(0, 360)}, 100%, 20%, 1)" />
      </radialGradient>
    </defs>
    <rect x="200%" y="50%" width="500%" height="300%" fill="url(#${id}-gradient-2)" opacity="0.3"/>

    <filter id="${id}-bg">
      <feTurbulence type="fractalNoise" baseFrequency="0.01" seed="${random(0, 100)}"/> 
        <feGaussianBlur stdDeviation="10"/>       
    </filter>
    <rect width="100%" height="100%" filter="url(#${id}-bg)" opacity="0.3"/>

    <filter id="${id}-stars">
      <feTurbulence baseFrequency="0.2" seed="${random(0, 100)}"/>
      <feColorMatrix values="0 0 0 9 -4
                            0 0 0 9 -4
                            0 0 0 9 -4
                            0 0 0 0 0.5"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#${id}-stars)"/>
  `;
}