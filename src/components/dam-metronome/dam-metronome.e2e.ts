import {newE2EPage} from '@stencil/core/testing';

describe('dam-metronome', () => {
  let page, element;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<dam-dam-metronome></dam-dam-metronome>');
    element = await page.find('dam-metronome');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });
});
