class Renderer {
  constuctor(scale) {
    this.scale = scale;
    this.rows = 32;
    this.cols = 64;

    // initialize canvas element
    this.canvas = document.querySelector('canvas');
    this.canvas.width = this.cols * this.scale; // screen width in px
    this.canvas.height = this.rows * this.scale; // screen height in px

    this.screen = this.canvas.getContext('2d');

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

  // refresh the screen
  render() {
    this.screen.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear screen

    this.pixelArr.forEach((pixel, index) => {
      if (pixel) {
        let x = index % this.cols;
        let y = Math.floor(index / this.cols);

        x *= this.scale;
        y *= this.scale;

        this.screen.fillStyle = '#000';
        this.screen.fillRect(x, y, this.scale, this.scale);
      }
    })
  }

  testRender() {
    this.setPixel(0, 0);
    this.setPixel(5, 2);
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

export default Renderer;
