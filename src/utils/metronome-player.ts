import scheduler from './click-scheduler';
import {PlayerStartOptions, Subdivision} from '../misc/misc';
import {soundBank} from './sound-bank';
import {getAudioContext, loadSample} from "./audio-context";
import makeSamplePlayable from "./sample-to-playable";

const pref = {
  stressed: function (sound, when) {
    sound.play.stressed(when);
  },
  [Subdivision.quarter]: function (sound, when) {
    sound.play.quarter(when);
  },
  [Subdivision.eight]: function (sound, when, beatNumber) {
    if (beatNumber % Subdivision.eight === 0) {
      sound.play.quarter(when);
    } else {
      sound.play.eighth(when);
    }
  },
  [Subdivision.sixteen]: function (sound, when, beatNumber) {
    if (beatNumber % Subdivision.sixteen === 0) {
      sound.play.quarter(when);
    } else {
      sound.play.sixteenth(when);
    }
  }
};

const start = (options: PlayerStartOptions): void => {
  const context = getAudioContext();
  let beatNumber = 0;
  let _sound = soundBank[0]; // setting default;
  const {bpm, subDiv, sound, src, stressNote} = options;

  const playSound = (when: number) => {
    beatNumber = beatNumber % 16;
    if (stressNote && beatNumber % (subDiv * 4) === 0) {
      pref.stressed(_sound, when);
    } else {
      pref[subDiv](_sound, when, beatNumber);
    }
    beatNumber++;
  };

  if (src) { // src has higher importance of processing. If failed it'll fall back to generated click sound
    loadSample(context, src)
      .then(makeSamplePlayable)
      .then(playable => {
        _sound = playable;
        scheduler.start(bpm, subDiv, playSound);
      })
  } else if (soundBank[sound]) {
    _sound = soundBank[sound];
    scheduler.start(bpm, subDiv, playSound);
  } else {
    scheduler.start(bpm, subDiv, playSound);
  }
};

const stop = () => {
  scheduler.stop();
};

const metroPlayer = {start, stop};

export default metroPlayer;
