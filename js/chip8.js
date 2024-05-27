import Screen from './screen.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js'
import CPU from './cpu.js'

const screen = new Screen(15);
const keyboard = new Keyboard;
const speaker = new Speaker();
const cpu = new CPU(screen, keyboard, speaker);

let framerate = 1000/60;
let then = Date.now();
let now, elapsed;

function step() {
  now = Date.now();
  elapsed = now - then;
  if (elapsed > framerate) {
    cpu.cycle();
    then = now;
  }
  requestAnimationFrame(step);
}

function startMachine(rom) {
  cpu.loadHexSpritesIntoRAM();
  cpu.loadRom(rom);
  requestAnimationFrame(step);
}

