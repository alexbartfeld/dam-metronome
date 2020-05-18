import {newE2EPage} from '@stencil/core/testing';

describe('dam-metronome', () => {
    let page, element;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent('<dam-metronome></dam-metronome>');
        element = await page.find('dam-metronome');
    });

    it('renders', async () => {
        expect(element).toHaveClass('hydrated');
    });

    it('should toggle stop to play button image when clicking play', async () => {
        const playButton = await page.find('dam-metronome >>> #metronome__btn');
        expect(await page.find('dam-metronome >>> #metronome__btn'))
            .toEqualHtml('<button id="metronome__btn"><span id="metronome__btn-play"></span></button>');
        await playButton.click();
        await page.waitForChanges();
        expect(await page.find('dam-metronome >>> #metronome__btn'))
            .toEqualHtml('<button id="metronome__btn"><span id="metronome__btn-stop"></span></button>');
    });

    it('should change bpm on bpm-screen when changing the bpm-range', async () => {
        const bpmScreen = await page.find('dam-metronome >>> #metronome__bpm-screen');
        expect(bpmScreen)
            .toEqualHtml('<span id="metronome__bpm-screen">120<span id="metronome__bpm">BPM</span></span>');
        const bpmRange = await page.find('dam-metronome >>> #metronome__bpm-range');
        await bpmRange.click();
        await page.waitForChanges();
        // with component width of 300px and range parameters of min=20 and max=260 a click in the center should give 140
        expect(bpmScreen)
            .toEqualHtml('<span id="metronome__bpm-screen">140<span id="metronome__bpm">BPM</span></span>');
    });

    it('it should add class active to checkbox (stress first beat) when clicked', async () => {
        const stressCheckBox = await page.find('dam-metronome >>> #stress__checkbox');
        const label = await page.find('dam-metronome >>> #stress');
        expect(stressCheckBox.classList.contains('active')).toBeFalsy();
        await label.click();
        await page.waitForChanges();
        expect(stressCheckBox.classList.contains('active')).toBeTruthy();
    });

    it('should only highlight the button of a selected sub-division', async () => {
        let subDivisionSection = await page.find('dam-metronome >>> #sub-division');
        expect(subDivisionSection.children[0]).toHaveClass('active');
        expect(subDivisionSection.children[1]).not.toHaveClass('active');
        expect(subDivisionSection.children[2]).not.toHaveClass('active');
        const btns = await page.findAll('dam-metronome >>> .sub-division__btn');
        await btns[2].click();
        await page.waitForChanges();
        expect(subDivisionSection.children[0]).not.toHaveClass('active');
        expect(subDivisionSection.children[1]).not.toHaveClass('active');
        expect(subDivisionSection.children[2]).toHaveClass('active');
    });
});
