class Rectangle {
  constructor({ x, y, width, height, color = "#000000", weight = 1 }) {
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
// TODO Релизовать анимацию
// TODO когда ширина одного квадрата будет на 90*2 больше другого создаем новый квадрат

class CanvasHandler {
  constructor(canvas = "canvas") {
    //   Set canvas and canvas context
    this.canvas = document.querySelector(canvas);
    this.ctx = this.canvas.getContext("2d");

    // Resize canvas
    this.resizeCanvas.apply(this);
  }

  get settings() {
    return {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      defaultStrokeColor: "#ddbea9",
      defaultStrokeWidth: 5,
    };
  }

  resizeCanvas() {
    //*  Function to set canvas sizesby default value
    this.canvas.setAttribute("width", this.settings.screenWidth);
    this.canvas.setAttribute("height", this.settings.screenHeight);
    return;
  }

  wipeScreen() {
    //   * Function to wipe screen
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    return;
  }

  createStrokeRectangle({
    startPoint: [x, y] = [undefined],
    centerPos = false,
    width,
    height,
    color = this.settings.defaultStrokeColor,
  }) {
    if (centerPos) {
      return new Rectangle({
        x: this.settings.screenWidth / 2 - width / 2,
        y: this.settings.screenHeight / 2 - height / 2,
        width,
        height,
        color,
        weight: 5,
      }).buildStrokeRect({ctx: this.ctx});
    }
    return new Rectangle({ x, y, width, height, color, weight: 5 }).buildStrokeRect({ctx: this.ctx});
  }
}
const handler = new CanvasHandler();
handler.wipeScreen();
handler.createStrokeRectangle({centerPos: true, width: 50, height: 50})

