import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';


export class SqSpikyBlobs extends SvgCanvas {
  name = "Spiky Blobs";
  width = 200;
  height = 100;

  draw = () => {
    let markup = "";
    markup += addBloc(100, 50, random(10, 48));
    this.canvas.innerHTML = markup;
  }
}

customElements.define("sq-spiky-blobs", SqSpikyBlobs);

function addBloc(x, y, radius) {
  let markup = '';
  let currentSize = radius;
  let currentRotation = random(0, 360);
  const color = {
    h: random(0, 360),
    s: 80,
    l: 40
  };
  let sizeDecrease = 0.1;

  while (currentSize > 0) {
    markup += addLeaf(x, y, currentSize, currentRotation, color);
    currentSize -= sizeDecrease;
    // sizeDecrease += 0.05;
    currentRotation += 25;

    color.l += 0.2;

    color.s += 0.2;

    if (currentRotation > 360) currentRotation -= 360;
  }

  return markup;
}

function addLeaf(x, y, size, rotate, color) {
  const startPoint = `${x} ${y}`;
  const endPoint = `${x} ${y - size}`;
  const controlPointY = y - (size * 1) / 3;
  const controlPointXDifferent = (size * 1) / 4;
  const controlPoint1 = `${x - controlPointXDifferent} ${controlPointY}`;
  const controlPoint2 = `${x + controlPointXDifferent} ${controlPointY}`;

  return `
    <path
      d="
        M${startPoint} 
        Q${controlPoint1} ${endPoint}
        Q${controlPoint2} ${startPoint}
        Z
      "
      fill="${hsl(color)}"
      stroke-width="0.5"
      stroke="${strokeColor(color)}"
      transform="rotate(${rotate}, ${x}, ${y})"
    />
  `;
}

function hsl(c) {
  return `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
}

function strokeColor(c) {
  const color = { ...c };
  color.l -= 20;
  color.s -= 20;

  return hsl(color);
}
