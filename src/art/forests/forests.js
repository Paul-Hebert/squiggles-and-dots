import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import { SqPreview } from '../../assets/js/sq-preview.js'
import {
  random
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";

const width = 200;
const height = 100;

export class SqForests extends SqPreview {
  constructor() {
    super();

    this.canvas = SVG().addTo(this).viewbox(0, 0, 200, 100);
  }

  draw = () => {
    const hue = random(0, 360);
  
    mountainLayer(this.canvas, hue);
    forestLayer(this.canvas, hue);
    mountainLayer(this.canvas, hue);
    forestLayer(this.canvas, hue);
  }

  clear = () => {
    this.canvas.clear();
  }
}

customElements.define("sq-forests", SqForests);

function forestLayer(svg, hue) {
  const layer = svg.group();
  let x = -20;

  const treePoints = [];

  while (x < width + 20) {
    treePoints.push(x);
    x += random(10, 20);
  }

  shuffle(treePoints);

  treePoints.forEach((point) => addTree(layer, point, hue));
}

function addTree(layer, x, hue) {
  const group = layer.group();
  const tree = {
    top: random(20, height - 30),
    bottom: height - random(0, 20),
    branchWidth: random(5, 10),
    branchHeight: random(5, 15),
    branchDistance: random(3, 7)
  };

  drawTree(group, x, tree, 2, `hsl(0, 0%, 100%)`);
  drawTree(group, x, tree, 1, `hsl(${hue}, 10%, 30%)`);
}

function drawTree(group, x, tree, width, color) {
  let y = tree.top;

  const trunk = group.line(x, y, x, height).stroke({ width, color });

  while (y < tree.bottom) {
    const branchBottom = y + tree.branchHeight;

    const branch = group
      .polyline([
        [x - tree.branchWidth, branchBottom],
        [x, y],
        [x + tree.branchWidth, branchBottom]
      ])
      .stroke({ width, color })
      .fill("none");

    y += tree.branchDistance;
  }
}

function mountainLayer(svg, hue) {
  const layer = svg.group();

  const mountainCount = random(1, 5);

  for (let i = 0; i < mountainCount; i++) {
    const xStart = random(-50, width - 100);
    const xEnd = random(xStart + 50, width + 50);
    const xMid = random(xStart, xEnd);
    const mountain = layer
      .polyline([
        [xStart, height],
        [xMid, random(-10, height - 20)],
        [xEnd, height]
      ])
      .stroke({ width: 1, color: `hsl(${hue}, 10%, 30%)` })
      .fill("hsl(0, 0%, 100%)");
  }
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
