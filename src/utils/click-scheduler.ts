import {getAudioContext} from "./audio-context";

let interval = null;
let lookahead = 25.0; // ms
let scheduleAheadTime = 0.1; // sec,
let context: AudioContext;

const start = (bpm, subDiv, cb: Function) => {
  context = getAudioContext();
  const intervalBetweenBeats = 60 / (bpm * subDiv);
  let nextNoteTime = context.currentTime;
  interval = setInterval(() => {
    while (nextNoteTime < context.currentTime + scheduleAheadTime) {
      cb(nextNoteTime);
      nextNoteTime += intervalBetweenBeats; // Add beat length to last beat time
    }
  }, lookahead);
};

const stop = () => {
  window.clearInterval(interval);
};

const scheduler = {
  start,
  stop
};

export default scheduler;
