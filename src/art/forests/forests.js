import { SvgCanvas } from '../../assets/js/svg-canvas.js'
import { random } from '../../assets/js/utils/random.js';

const width = 200;
const height = 100;

export class SqForests extends SvgCanvas {
  name = "Generative Forests";
  width = width;
  height = height;

  draw = () => {
    const hue = random(0, 360);
  
    this.innerHTML = `
      ${mountainLayer(hue)}
      ${forestLayer(hue)}
      ${mountainLayer(hue)}
      ${forestLayer(hue)}
    `;
  }
}

customElements.define("sq-forests", SqForests);

function forestLayer(hue) {
  let markup;
  let x = -20;

  const treePoints = [];

  while (x < width + 20) {
    treePoints.push(x);
    x += random(10, 20);
  }

  shuffle(treePoints);

  treePoints.forEach((point) => {
    markup += addTree(point, hue)
  });

  return `<g>${markup}</g>`;
}

function addTree(x, hue) {
  let markup;
  const tree = {
    top: random(20, height - 30),
    bottom: height - random(0, 20),
    branchWidth: random(5, 10),
    branchHeight: random(5, 15),
    branchDistance: random(3, 7)
  };

  markup += drawTree(x, tree, 2, `hsl(0, 0%, 100%)`);
  markup += drawTree(x, tree, 1, `hsl(${hue}, 10%, 30%)`);

  // console.log('tree2', markup)
  return `<g>${markup}</g>`;
}

function drawTree(x, tree, width, color) {
  let markup = '';
  let y = tree.top;

  markup += `
    <line
      x1="${x}" y1="${y}"
      x2="${x}" y2="${height}"
      stroke-width="${width}"
      stroke="${color}"
    />
  `;

  while (y < tree.bottom) {
    const branchBottom = y + tree.branchHeight;

    // markup += `
    //   <polyline
    //     points="
    //       ${x - tree.branchWidth}, ${branchBottom}
    //       ${x}, ${y}
    //       ${x + tree.branchWidth}, ${branchBottom}
    //     "
    //     x1="${x}" y1="${y}"
    //     x2="${x}" y2="${height}"
    //     stroke-width="${width}"
    //     stroke="${color}"
    //     fill="none"
    //   />
    // `;

    y += tree.branchDistance;
  }

  console.log('tree', markup)
  return markup;
}

function mountainLayer(svg, hue) {
  return '';
  // const layer = svg.group();

  // const mountainCount = random(1, 5);

  // for (let i = 0; i < mountainCount; i++) {
  //   const xStart = random(-50, width - 100);
  //   const xEnd = random(xStart + 50, width + 50);
  //   const xMid = random(xStart, xEnd);
  //   const mountain = layer
  //     .polyline([
  //       [xStart, height],
  //       [xMid, random(-10, height - 20)],
  //       [xEnd, height]
  //     ])
  //     .stroke({ width: 1, color: `hsl(${hue}, 10%, 30%)` })
  //     .fill("hsl(0, 0%, 100%)");
  // }
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}
