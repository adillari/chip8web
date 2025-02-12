export default class {
  KEYMAP: { [key: number]: number };
  keysPressed: boolean[];
  onNextKeypress: null | ((key: number) => void);

  constructor() {
    this.KEYMAP = {
      49: 0x1, // 1
      50: 0x2, // 2
      51: 0x3, // 3
      52: 0xc, // 4
      81: 0x4, // Q
      87: 0x5, // W
      69: 0x6, // E
      82: 0xd, // R
      65: 0x7, // A
      83: 0x8, // S
      68: 0x9, // D
      70: 0xe, // F
      90: 0xa, // Z
      88: 0x0, // X
      67: 0xb, // C
      86: 0xf, // V
    };

    this.keysPressed = [];

    this.onNextKeypress = null;

    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  onKeyDown(event) {
    // event.which is deprecated, look into using KeyboardEvent.key
    let key = this.KEYMAP[event.which];
    this.keysPressed[key] = true;

    if (this.onNextKeypress && key) {
      this.onNextKeypress(+key);
      this.onNextKeypress = null;
    }
  }

  onKeyUp(event) {
    // event.which is deprecated, look into using KeyboardEvent.key
    let key = this.KEYMAP[event.which];
    this.keysPressed[key] = false;
  }

  isKeyPressed(keyCode) {
    return this.keysPressed[keyCode];
  }
}
