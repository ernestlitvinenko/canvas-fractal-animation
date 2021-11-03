const stroke_color = "#ddbea9";
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

class Rectangle {
  constructor(x, y, width, height, color = "#000000", weight = 1) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.weight = weight;
    this.filled = undefined;
  }
  wipe({ ctx }) {
    ctx.clearRect(
      this.x - this.weight,
      this.y - this.weight,
      this.width + this.weight * 2,
      this.height + this.weight * 2
    );
  }

  changeDrawStyle({ ctx }) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.weight;
  }

  buildStrokeRect({ ctx }) {
    this.filled = false;
    this.changeDrawStyle.bind(this)({ ctx });
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    return this;
  }

  buildFilledRect({ ctx }) {
    this.filled = true;
    this.changeDrawStyle.bind(this)({ ctx });
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
}

const canvas = document.querySelector("canvas");

// Change canvas width and height
canvas.setAttribute("width", screenWidth);
canvas.setAttribute("height", screenHeight);

const ctx = canvas.getContext("2d");

function createStrokeRectangles({
  startPoint: [x, y] = [0, 0],
  width = 10,
  height = 10,
  color = "black",
}) {
  return new Rectangle(x, y, width, height, color).buildStrokeRect({ ctx });
}
let [width, height] = [10, 10];
r = createStrokeRectangles({
  startPoint: [screenWidth / 2 - width / 2, screenHeight / 2 - height / 2],
  color: "white",
  width, height
});
let scale = 1
function tick() {
    canvas.style.transform = `scale(${scale})`
    scale += 0.001
    // requestAnimationFrame(tick)
}

// TODO когда ширина одного квадрата будет на 90*2 больше другого создаем новый квадрат
// requestAnimationFrame(tick)