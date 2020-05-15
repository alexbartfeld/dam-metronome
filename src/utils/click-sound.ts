import {getAudioContext} from "./audio-context";

const clickSound = (when: number, frequency: number, gain?: number) => {
  const context = getAudioContext();
  const length = 0.05;
  const osc = context.createOscillator();
  const gainNode = context.createGain();
  osc.connect(gainNode);
  gainNode.connect(context.destination);
  osc.frequency.setValueAtTime(frequency, when);
  gainNode.gain.setValueAtTime(gain || 1, when);
  gainNode.gain.exponentialRampToValueAtTime(0.01, when + length);
  osc.start(when);
  osc.stop(when + length);
};

const play = {
  stressed: function (when: number, gain?: number) {
    clickSound(when, 1700, gain);
  },
  quarter: function (when: number, gain?: number) {
    clickSound(when, 1100, gain);
  },
  eighth: function (when: number) {
    clickSound(when, 700, 0.5);
  },
  sixteenth: function (when: number) {
    clickSound(when, 700, 0.5);
  }
};

const click = {play};

export default click;
