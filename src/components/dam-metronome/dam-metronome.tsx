import {Component, ComponentInterface, Host, h, State, Watch, Prop} from '@stencil/core';
import {Subdivision} from '../../misc/misc';
import metroPlayer from "../../services/metronome-player";
import {Sound} from "../../services/sound-bank";

@Component({
    tag: 'dam-metronome',
    styleUrl: 'dam-metronome.css',
    shadow: true
})
export class DamMetronome implements ComponentInterface {
    @State() stressFirstNote: boolean = false;
    @State() subDiv: number = Subdivision.quarter;
    @State() input: number; // for fluid change of numbers in UI
    @State() isPlaying: boolean = false;

    @Prop() src: string = '';
    @Prop() bpm: number = 120;

    @Watch('subDiv')
    handleSubDivisionChangeState() {
        this.handleParametersChange();
    }

    @Watch('bpm')
    handleBpmChangeState() {
        this.handleParametersChange();
    }

    @Watch('stressFirstNote')
    handleStressChangeState() {
        this.handleParametersChange();
    }

    constructor() {
        this.input = this.bpm;
        this.handleSubDivisionChange = this.handleSubDivisionChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBpmChange = this.handleBpmChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    private handleParametersChange() {
        if (this.isPlaying) {
            this.stop();
            this.play();
        }
    };

    private play(): void {
        metroPlayer.start({
            bpm: this.bpm,
            stressNote: this.stressFirstNote,
            sound: Sound.click,
            src: this.src,
            subDiv: this.subDiv,
        });
        this.isPlaying = true;
    }

    private stop(): void {
        metroPlayer.stop();
        this.isPlaying = false;
    }

    private handleClick(): void {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
    }

    private handleBpmChange(): void {
        this.bpm = this.input;
    }

    private handleInputChange(e): void {
        this.input = e.target.value;
    }

    private handleSubDivisionChange(val): void {
        this.subDiv = val;
    }

    render() {
        const content = this.isPlaying ? <span id="metronome__btn-stop"/> : <span id="metronome__btn-play"/>;

        return (
            <Host>
                <div class="flex-row">
                    <span id="metronome__bpm-screen">{this.input}<span id="metronome__bpm">BPM</span></span>

                    <button id="metronome__btn"
                            onClick={this.handleClick}>{content}</button>
                </div>

                <input id="metronome__bpm-range" type="range" min={20} max={260} value={this.bpm}
                       onInput={this.handleInputChange}
                       onChange={this.handleBpmChange}/>

                <div class="flex-row--end margin-top">
                    <label id="accent">
                        <input id="accent__checkbox" onChange={(e) => {
                            this.stressFirstNote = (e.target as HTMLInputElement).checked
                        }} type="checkbox"/>
                        <div id="accent__indicator"/>
                        <div id="accent__text">
                            <slot>Stress first beat</slot>
                        </div>
                    </label>

                    <div id="sub-division">
                        <button
                            class={this.subDiv === Subdivision.quarter ? "sub-division__btn active" : "sub-division__btn"}
                            onClick={() => {
                                this.handleSubDivisionChange(Subdivision.quarter)
                            }}>1/4
                        </button>
                        <button
                            class={this.subDiv === Subdivision.eight ? "sub-division__btn active" : "sub-division__btn"}
                            onClick={() => {
                                this.handleSubDivisionChange(Subdivision.eight)
                            }}>1/8
                        </button>
                        <button
                            class={this.subDiv === Subdivision.sixteen ? "sub-division__btn active" : "sub-division__btn"}
                            onClick={() => {
                                this.handleSubDivisionChange(Subdivision.sixteen)
                            }}>1/16
                        </button>
                    </div>
                </div>
            </Host>
        );
    }
}
