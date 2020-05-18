jest.mock('../../services/metronome-player');
import {DamMetronome} from './dam-metronome';

describe('dam-metronome', () => {
    let component;

    beforeEach(async () => {
        component = new DamMetronome();
    });

    it('should call this.playerStart function when user clicks play', function () {
        component.play();
        expect(component._playerStart).toHaveBeenCalledWith({
            bpm: 120,
            sound: 'click',
            src: '',
            stressNote: false,
            subDiv: 1
        });
    });

    it('should call this.playerStop function when user clicks stop', function () {
        component.stop();
        expect(component._playerStop).toHaveBeenCalled();
    });
});
