import Screen from "./screen.js";
import Keyboard from "./keyboard.js";
import Speaker from "./speaker.js";
import CPU from "./cpu.js";

const screen = new Screen(15);
const keyboard = new Keyboard();
const speaker = new Speaker();
const cpu = new CPU(screen, keyboard, speaker);

let framerate = 1000 / 60;
let then = Date.now();
let now, elapsed: Date;

function step() {
  now = Date.now();
  elapsed = now - then;
  if (elapsed > framerate) {
    cpu.cycle();
    then = now;
  }
  requestAnimationFrame(step);
}

async function fetchROM(romName) {
  try {
    const response = await fetch("roms/" + romName);
    if (!response.ok) {
      return ["error", response.statusText];
    }
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    return ["error", error.message];
  }
}

function loadRom(romname) {
  let rom: string = document.getElementById("rom-select").value;
  
}

window.startMachine = async (romName) => {
  let arrayBuffer = await fetchROM(romName);
  if (arrayBuffer[0] === "error") {
    alert(arrayBuffer[1]);
  } else {
    cpu.loadProgramIntoRAM(arrayBuffer);
    requestAnimationFrame(step);
  }
};
