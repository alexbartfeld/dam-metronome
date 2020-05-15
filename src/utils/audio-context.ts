let context = null, loadedSamples = {};

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

export function loadSample(context, path): Promise<AudioBuffer> {
  return new Promise((resolve) => {
    if (loadedSamples[path]) {
      resolve(loadedSamples[path]);
    } else {
      fetch(path).then((response) => {
        response.arrayBuffer().then((arrayBuffer) => {
          context.decodeAudioData(arrayBuffer, (value) => {
            loadedSamples[path] = value;
            resolve(value);
          });
        })
      });
    }
  })
}
