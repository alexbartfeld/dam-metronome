let context = null;

export function getAudioContext(): AudioContext {
    if (context) return context;
    const contextClass = (
        window.AudioContext ||
        // @ts-ignore
        window.webkitAudioContext ||
        // @ts-ignore
        window.mozAudioContext ||
        // @ts-ignore
        window.oAudioContext ||
        // @ts-ignore
        window.msAudioContext
    );
    if (contextClass) {
        context = new contextClass();
    } else {
        throw new Error('Web Audio API is not available. You\'ll need to use a supported browser.')
    }
    return context;
}
