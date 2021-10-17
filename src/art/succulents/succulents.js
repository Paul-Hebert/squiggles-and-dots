import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';


export class SqSucculents extends SvgCanvas {
  name = "Generative Succulents";
  width = 2280;
  height = 3600;

  draw = () => {
    let markup = '';

    this.svg.style.backgroundColor = hsla({
      h: random(0, 360),
      s: random(50, 60),
      l: random(10, 100),
      a: 100
    });
  
    const succulents = [];
    const minSucculentSize = 30;
    const maxSucculentSize = 600;
    for (let i = 0; i < 1000; i++) {
      const newSucculent = {
        x: random(0, this.width),
        y: random(0, this.height),
        radius: maxSucculentSize
      };
  
      while (
        isColliding(succulents, newSucculent) &&
        newSucculent.radius > minSucculentSize
      ) {
        newSucculent.radius -= 1;
      }
  
      if (newSucculent.radius > minSucculentSize) {
        succulents.push(newSucculent);
        markup += addSucculent({...newSucculent});
      }
    }

    this.canvas.innerHTML = markup;
  }
}

customElements.define("sq-succulents", SqSucculents);

function addSucculent({ x, y, radius }) {
  let markup = '';
  let currentSize = radius;
  let currentRotation = random(0, 360);
  const color = {
    h: random(60, 150),
    s: 80,
    l: 40,
    a: 100
  };
  let sizeDecrease = radius * 0.005;

  while (currentSize > 0) {
    markup += addLeaf(x, y, currentSize, currentRotation, color);
    currentSize -= sizeDecrease;
    sizeDecrease *= 1.05;
    currentRotation += 25;

    color.l += 0.2;

    color.s += 0.2;

    if (currentRotation > 360) currentRotation -= 360;
  }

  // TODO
  // const circleSize = Math.min(1.5, radius / 10);
  // group
  //   .circle(circleSize)
  //   .x(x - circleSize / 2)
  //   .y(y - circleSize / 2)
  //   .fill(hsla(color))
  //   .stroke({
  //     width: 0.5,
  //     color: strokeColor(color)
  //   });

  return `<g>${markup}</g>`
}

function addLeaf(x, y, size, rotate, color) {
  const startPoint = `${x} ${y}`;
  const endPoint = `${x} ${y - size}`;
  const controlPointY = y - (size * 1) / 3;
  const controlPointXDifferent = Math.max((size * 1) / 4, 2);
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
      fill="${hsla(color)}"
      stroke-width="${2}"
      stroke="${strokeColor(color)}"
      transform="rotate(${rotate} ${x} ${y})"
    />
  `;
}

function hsla(c) {
  return `hsla(${c.h}, ${c.s}%, ${c.l}%, ${c.a}%)`;
}

function strokeColor(c) {
  const color = { ...c };
  color.h -= 180;
  if (color.h < 0) color.h + 360;
  color.l -= 10;
  color.s += 10;
  color.a = 10;

  return hsla(color);
}

function isColliding(circles, newCircle) {
  let colliding = false;
  for (let i = 0; i < circles.length; i++) {
    if (checkOverlap(circles[i], newCircle)) {
      colliding = true;
    }
  }
  return colliding;
}

function checkOverlap(circle1, circle2) {
  const xDistance = circle1.x - circle2.x;
  const yDistance = circle1.y - circle2.y;
  const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  // We fudge the first radius to allow a little overlap
  return distance < circle1.radius * 0.8 + circle2.radius;
}
