import {newSpecPage} from '@stencil/core/testing';
import {DamMetronome} from './dam-metronome';

describe('dam-metronome', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DamMetronome],
      html: `<dam-metronome></dam-metronome>`,
    });
    expect(page.root).toEqualHtml(`
      <dam-metronome>
        <mock:shadow-root>
          <div class="flex-row">
           <span id="metronome__bpm-screen">
             120
             <span id="metronome__bpm">
               BPM
             </span>
           </span>
           <button id="metronome__btn">
             <span id="metronome__btn-play"></span>
           </button>
         </div>
         <input id="metronome__bpm-range" max="260" min="20" type="range" value="120">
         <div class="flex-row--end margin-top">
           <label id="accent">
             <input id="accent__checkbox" type="checkbox">
             <div id="accent__indicator"></div>
             <div id="accent__text">
               <slot>
                 Stress first beat
               </slot>
             </div>
           </label>
           <div id="sub-division">
             <button class="active sub-division__btn">
               1/4
             </button>
             <button class="sub-division__btn">
               1/8
             </button>
             <button class="sub-division__btn">
               1/16
             </button>
           </div>
         </div>
        </mock:shadow-root>
      </dam-metronome>
    `);
  });
});
