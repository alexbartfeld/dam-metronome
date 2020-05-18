// Sounds
import click from "../sounds/click-sound";

// Sound registration steps

// #1
enum Sound {
    click = 'click'
}

// #2
const soundBank = {
    [Sound.click]: click
};

export {Sound, soundBank};
