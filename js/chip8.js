import Screen from './screen.js';

const screen = new Screen(15);

screen.togglePixel(0, 0);
screen.togglePixel(5, 2);
screen.refresh();
