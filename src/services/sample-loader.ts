const loadedSamples = {};

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
