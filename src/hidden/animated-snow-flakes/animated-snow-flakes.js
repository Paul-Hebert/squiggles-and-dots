import { SvgCanvas } from "../../assets/js/svg-canvas.js";
import { random, randomItemInArray } from "../../assets/js/utils/random.js";

const buildRepeatedShape = (spokes, shape) => {
  let angle = 360 / spokes;

  let shapes = "";
  for (let spoke = 0; spoke < spokes; spoke++) {
    shapes += `<g style="--index: ${spoke};--rotation: ${
    angle * spoke
  }deg" class="spinner">${shape}</g>`;
  }
  return shapes;
};

const buildBaseShape = (size, svgEl) => {
  const strokeWidth = random(1, 2);

  const spoke = `
      <line  
        x1="50" x2="50" y1="50" y2="${50 - size}"
        style="--length: ${size}"
        class="trunk"
      />
    `;

  let offshoots = [];

  let index = 0;
  for (
    let i = random(3, 5 * strokeWidth);
    i < size;
    i += random(2 * strokeWidth, 10 * strokeWidth)
  ) {
    index++;

    const distance = random(5, Math.min(size - i, 10));
    offshoots.push(`
        <line 
          x1="50" x2="${50 - distance}" y1="${50 - i}" y2="${50 - i - distance}"
          class="branch"
          style="--index: ${index}; --length: ${
                   Math.hypot(distance, distance) + 1
                   };"
        />
      `);
    offshoots.push(`
        <g class="flip">
        <line 
          x1="50" x2="${50 - distance}" y1="${50 - i}" y2="${50 - i - distance}"
          class="branch"
          style="--index: ${index}; --length: ${
                   Math.hypot(distance, distance) + 1
                   };"
        />
        </g>
      `);
  }
  
  svgEl.style.setProperty('--branch-count', offshoots.length);

  return (
    `
      <g>
        ${spoke} ${offshoots.join("")}
      </g>
      `
  );
};

export class SqAnimatedSnowFlakes extends SvgCanvas {
  name = "Snow Flakes";
  width = 100;
  height = this.width;

  draw = () => {
    const size = random(25, 45);
    const spokes = randomItemInArray([10, 9, 8, 6]);

    this.styles.innerHTML = `
      sq-animated-snow-flakes svg,
      sq-animated-snow-flakes .js-canvas {
        --base-speed: 0.5s;
      
        --trunk-duration: var(--base-speed);
        --branch-duration: var(--base-speed);
      
        --flip-delay: calc(var(--trunk-duration) * 2/3 + var(--branch-count) * var(--base-speed) / 3);
        --flip-length: var(--base-speed);
      
        --spin-delay: calc(var(--flip-delay) + var(--flip-length));
        --spin-length: calc(var(--base-speed) * 2);
        
        --flake-delay: calc(var(--spin-delay) + var(--spin-length) + var(--base-speed));
      }
      
      sq-animated-snow-flakes line {
        stroke: #fff;
        stroke-width: 1.5px;
        stroke-linecap: round;
      
      
        stroke-dasharray: var(--length);
        stroke-dashoffset: var(--length);
        animation: dash var(--duration) both;
      }
      
      .trunk {
        --duration: var(--trunk-duration);
      }
      
      .branch {
        --duration: var(--branch-duration);
        animation-delay: calc(var(--trunk-duration) * 1/3 + var(--index) * var(--base-speed) / 4);
      }
      
      @keyframes dash {
        to {
          stroke-dashoffset: 0;
        }
      }
      
      .flip {
        animation: flip var(--flip-length) forwards;
        animation-delay: var(--flip-delay);
        transform-origin: center;
      }
      
      @keyframes flip {
        to {
          transform: scaleX(-1);
        }
      }
      
      .spinner {
        animation: spin calc(var(--spin-length) * (var(--index)/var(--spokes))) forwards;
        animation-delay: var(--spin-delay);
        transform-origin: center;
      }
      
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(calc(var(--rotation) / 2));
        }
        100% {
          transform: rotate(var(--rotation));
        }
      }
      
      .flake {
        animation: fade 0.5s ease-out both;
        animation-delay: var(--flake-delay);
        transform-origin: center;
      }
      
      @keyframes fade {
        to {
          opacity: 0;
          transform: translateY(5%);
        }
      }

      line {
        stroke: #fff;
        stroke-width: 1.5px;
        stroke-linecap: round;
        
        
        stroke-dasharray: var(--length);
        stroke-dashoffset: var(--length);
        animation: dash var(--duration) both;
      }

      .trunk {
        --duration: var(--trunk-duration);
      }

      .branch {
        --duration: var(--branch-duration);
        animation-delay: calc(var(--trunk-duration) * 1/3 + var(--index) * var(--base-speed) / 4);
      }

      @keyframes dash {
        to {
          stroke-dashoffset: 0;
        }
      }

      .flip {
        animation: flip var(--flip-length) forwards;
        animation-delay: var(--flip-delay);
        transform-origin: center;
      }

      @keyframes flip {
        to {
          transform: scaleX(-1);
        }
      }

      .spinner {
        animation: spin calc(var(--spin-length) * (var(--index)/${spokes})) forwards;
        animation-delay: var(--spin-delay);
        transform-origin: center;
      }

      @keyframes spin {
        to {
          transform: rotate(var(--rotation));
        }
      }
    `;
  
    this.canvas.style.setProperty('--spokes', spokes);
    this.svg.style.backgroundColor = `hsl(
      ${random(190, 210)}, 
      ${random(30, 60)}%, 
      ${random(50, 80)}%
    )`;
    this.canvas.innerHTML = `
      <g class="flake">
        ${buildRepeatedShape(spokes, buildBaseShape(size, this.canvas))}
      </g>
    `;
  };


  connectedCallback() {
    this.canvas = this.addCanvas();
    this.play();
  }

  play = () => {
    this.draw();
    this.addEventListener('animationend', ({target}) => {
      if(target.classList.contains('flake')) {
        setTimeout(this.draw, 500);
      }
    })
  }
}


customElements.define("sq-animated-snow-flakes", SqAnimatedSnowFlakes);
