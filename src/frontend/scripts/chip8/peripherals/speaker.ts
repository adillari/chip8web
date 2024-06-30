class Speaker {
  audioContext: AudioContext;
  gain;
  finish;
  oscillator;

  constructor() {
    this.audioContext = new window.AudioContext();
    this.gain = this.audioContext.createGain();
    this.finish = this.audioContext.destination;
    this.gain.connect(this.finish);
  }

  play(frequency) {
    if (this.audioContext && !this.oscillator) {
      this.oscillator = this.audioContext.createOscillator();
      this.oscillator.frequency.setValueAtTime(
        frequency || 440,
        this.audioContext.currentTime,
      );
      this.oscillator.type = "square";
      this.oscillator.connect(this.gain);
      this.oscillator.start();
    }
  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
  }
}

export default Speaker;
