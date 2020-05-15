// Sounds
import click from "./click-sound";

enum Sound {
  click = 'click'
}

const soundBank = {
  [Sound.click]: click
};

export {Sound, soundBank};
