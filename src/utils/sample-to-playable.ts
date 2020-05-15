import {getAudioContext} from "./audio-context";

const playbackRate = {
  high: 1.1,
  mid: 1,
  low: 0.9
};

const playSound = (when, sample, rate, gain) => {
  const context = getAudioContext();
  const source = context.createBufferSource();
  const gainNode = context.createGain();
  source.buffer = sample;
  source.playbackRate.value = rate;
  source.connect(gainNode);
  gainNode.connect(context.destination);
  gainNode.gain.setValueAtTime(gain || 1, when);
  source.start(when);
};

const makeSamplePlayable = (sample) => {
  const play = {
    stressed: function (when: number) {
      playSound(when, sample, playbackRate.high, 1);
    },
    quarter: function (when: number) {
      playSound(when, sample, playbackRate.mid, 1);
    },
    eighth: function (when: number) {
      playSound(when, sample, playbackRate.low, 0.1);
    },
    sixteenth: function (when: number) {
      playSound(when, sample, playbackRate.low, 0.1);
    }
  };

  return {play};
};
export default makeSamplePlayable;
