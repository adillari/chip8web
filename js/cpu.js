class CPU {
  constructor(screen, keyboard, speaker) {
    this.SCREEN = screen;
    this.KEYBOARD = keyboard;
    this.SPEAKER = speaker;

    this.MEMORY = new Uint8Array(4096); // 4KB of memory
    this.V = new Uint8Array(16); // 16 8 bit registers
    this.I = 0x0000; // 16 bit memory pointer
    this.PC = 0x0200; // program counter
    this.DT = 0; // delay timer
    this.ST = 0; // sound timer
    this.STACK = new Array();

    this.PAUSED = false;
    this.SPEED = 10;
  }

  cycle() {
    for (let i = 0; i < this.SPEED; i++) {
      if (!this.PAUSED) {
        let opcode = (this.MEMORY[this.PC] << 8 | this.MEMORY[this.PC + 1]);
        this.executeInstruction(opcode)
      }
    }

    if (!this.PAUSED) {
      this.updateTimers();
    }

    this.playSound();
    this.SCREEN.refresh();
  }


  loadRom(filename) {
    var request = new XMLHttpRequest;
    var self = this;

    request.onload = () => {
      if (request.response) {
        let program = new Uint8Array(request.repsonse)
        self.loadProgramIntoRAM(program)
      }
    }

    request.open('GET', `roms/${filename}`);
    request.responseType = 'arraybuffer';
    request.send();
  }

  // assumes the program is coming in as an array of bytes
  loadProgramIntoRAM(program) {
    program.forEach((byte, index) => {
      this.MEMORY[0x200 + index] = byte;
    })
  }

  loadHexSpritesIntoRAM() {
    SPRITES = [
      0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
      0x20, 0x60, 0x20, 0x20, 0x70, // 1
      0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
      0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
      0x90, 0x90, 0xF0, 0x10, 0x10, // 4
      0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
      0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
      0xF0, 0x10, 0x20, 0x40, 0x40, // 7
      0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
      0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
      0xF0, 0x90, 0xF0, 0x90, 0x90, // A
      0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
      0xF0, 0x80, 0x80, 0x80, 0xF0, // C
      0xE0, 0x90, 0x90, 0x90, 0xE0, // D
      0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
      0xF0, 0x80, 0xF0, 0x80, 0x80  // F
    ];

    SPRITES.forEach((byte, index) => {
      this.MEMORY[index] = byte;
    });
  }
}

export default CPU;
