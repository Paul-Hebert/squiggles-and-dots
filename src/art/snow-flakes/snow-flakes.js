import { SvgCanvas } from "../../assets/js/svg-canvas.js";
import { random, randomItemInArray } from "../../assets/js/utils/random.js";
import { nanoid } from "../../assets/js/utils/nanoid.js";

export class SqSnowFlakes extends SvgCanvas {
  name = "Snow Flakes";
  width = 100;
  height = this.width;

  draw = () => {
    const size = random(25, 45);
    const id = nanoid();
    const angle = randomItemInArray([40, 45, 60]);

    this.defs.innerHTML = this.buildBaseShape(size, id);

    this.canvas.innerHTML = `
      ${this.buildBackground()}
      ${this.buildRepeatedShape(angle, id)}
    `;
  };

  buildBackground = () => {
    const fill = `hsl(
      ${random(190, 210)}, 
      ${random(30, 60)}%, 
      ${random(50, 80)}%
    )`;
    return `<rect x="0" y="0" width="100" height="100" fill="${fill}"/>`;
  };

  buildRepeatedShape = (angle, id) => {
    let shapes = "";
    for (let currentAngle = 0; currentAngle !== 360; currentAngle += angle) {
      shapes += `<use href="#${id}" transform="rotate(${currentAngle}, 50, 50)"/>`;
    }
    return shapes;
  };

  buildBaseShape = (size, id) => {
    const strokeWidth = random(1, 3);

    const styles = `
      stroke="#fff"
      stroke-width="${strokeWidth}"
      stroke-linecap="round"
    `;

    const spoke = `
      <line  
        x1="50" x2="50" y1="50" y2="${50 - size}"
        ${styles}
      />
    `;

    let offshoots = [];

    for (let i = random(3, 10); i < size; i += random(5, 20)) {
      const distance = random(5, Math.min(size - i, 10));
      offshoots.push(`
        <line 
          x1="50" x2="${50 - distance}" y1="${50 - i}" y2="${50 - i - distance}"
          ${styles}
        />
      `);
    }

    const halfId = nanoid();

    const shapeHalf = `<g id="${halfId}">${spoke} ${offshoots.join("")}</g>`;

    return (
      shapeHalf +
      `
      <g id="${id}">
        <use href="#${halfId}" />
        <use href="#${halfId}" style="transform-origin: center; transform: scaleX(-1)" />
      </g>
      `
    );
  };
}

customElements.define("sq-snow-flakes", SqSnowFlakes);
