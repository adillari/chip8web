import Machine from "./chip8/machine";
let machine: Machine;

let framerate: number = 1000 / 60;
let elapsed: number;
let then: number = Date.now();
let now: number;

function step() {
  now = Date.now();
  elapsed = now - then;
  if (elapsed > framerate) {
    machine.cycle();
    then = now;
  }
  requestAnimationFrame(step);
}

async function fetchROM(rom) {
  try {
    const response = await fetch(`roms/${rom}.ch8`);
    if (!response.ok) {
      return ["error", response.statusText];
    }
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    return ["error", error.message];
  }
}

async function loadROM() {
  const romSelect = document.getElementById("rom-select") as HTMLSelectElement;
  let arrayBuffer = await fetchROM(romSelect.value);

  if (arrayBuffer[0] === "error") {
    alert(arrayBuffer[1]);
  } else {
    const quirks: Record<string, boolean> = {
      originalShiftBehavior: true,
      incrementIndex: true,
    };
    machine = new Machine(quirks);
    machine.loadProgramIntoRAM(arrayBuffer);
    requestAnimationFrame(step);
  }
}

document.getElementById("load-rom-button").addEventListener("click", loadROM);
