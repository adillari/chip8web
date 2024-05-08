class Screen {
  constructor(scale) {
    this.scale = scale;
    this.rows = 32;
    this.cols = 64;

    // initialize canvas element
    this.canvasElement = document.querySelector('canvas');
    this.canvasElement.width = this.cols * this.scale; // screen width in px
    this.canvasElement.height = this.rows * this.scale; // screen height in px

    this.canvas = this.canvasElement.getContext('2d');

    this.pixelArr = new Array(this.cols * this.rows); // array of all pixels
  }

  setPixel(x, y) {
    [x, y] = this.#normalizePixel(x, y);
    let pixel = x + (y * this.cols);

    this.pixelArr[pixel] ^= 1; // flip pixel

    return !this.pixelArr[pixel]; // return true if the pixel was erased
  }

  clear() {
    this.pixelArr = new Array(this.cols * this.rows);
  }

  refresh() {
    this.canvas.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height); // clear screen

    this.pixelArr.forEach((pixel, index) => {
      if (pixel) {
        let x = index % this.cols;
        let y = Math.floor(index / this.cols);

        x *= this.scale;
        y *= this.scale;

        this.canvas.fillStyle = '#E879F9';
        this.canvas.fillRect(x, y, this.scale, this.scale);
      }
    })
  }

  //
  // private
  //

  // wraps out of bound pixels
  #normalizePixel(x, y) {
    if (x > this.cols) x -= this.cols;
    if (x < 0) x += this.cols;
    if (y > this.rows) y -= this.rows;
    if (y < 0) y += this.rows;

    return [x, y];
  }
}

export default Screen;
