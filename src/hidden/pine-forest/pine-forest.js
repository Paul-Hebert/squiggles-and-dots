import { SvgCanvas } from "../../assets/js/svg-canvas.js";
import { random, randomInt } from "../../assets/js/utils/random.js";

export class SqPineForest extends SvgCanvas {
  name = "Example";
  width = 300;
  height = 200;

  draw = () => {
    const y = 200;

    const trees = [];

    for (
      let x = randomInt(20, 30);
      x < this.width - randomInt(20, 30);
      x += randomInt(10, 50)
    ) {
      trees.push(this.tree({ x, y, height: random(80, 150) }));
    }

    this.canvas.innerHTML = trees.join("\n");
  };

  tree({ x, y, height }) {
    return this.trunk({ x, y, height }) + this.branches({ x, y, height });
  }

  trunk({ x, y, height }) {
    return `
      <path
        stroke="#666"
        fill="#666"
        stroke-width="3"
        stroke-linejoin="round"
        d="
          M${x - 2} ${y}
          L${x} ${y - height}
          L${x + 2} ${y}
          Z
        "
      />
    `;
  }

  branches({ x, y, height }) {
    return (
      this.branchSide({ x, y, height }) +
      this.branchSide({ x, y, height }, true)
    );
  }

  branchSide({ x, y, height }, isLeft = false) {
    const topPoint = y - height;
    const branches = [];
    for (
      let distanceFromTop = 0;
      distanceFromTop < height - random(20, 40);
      distanceFromTop += randomInt(2, 10)
    ) {
      branches.push(
        this.branch({
          x,
          y: topPoint + distanceFromTop,
          isLeft,
          lengthBase: 10 + distanceFromTop / random(3, 5),
        })
      );
    }

    return branches.join("\n");
  }

  branch({ x, y, isLeft, lengthBase }) {
    const xMultiplier = isLeft ? -1 : 1;
    return `
      <path
        stroke="#666"
        fill="#666"
        stroke-width="1"
        stroke-linejoin="round"
        d="
          M${x} ${y - 1}
          L${x + lengthBase * xMultiplier} ${y + lengthBase / randomInt(2, 3)}
          L${x} ${y + 1}
          Z
        "
      />
    `;
  }
}

customElements.define("sq-pine-forest", SqPineForest);
