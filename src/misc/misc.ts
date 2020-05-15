export interface PlayerStartOptions {
  bpm: number,
  stressNote: boolean,
  sound?: string,
  src?: string,
  subDiv: number
}

export enum Accent {
  high,
  mid,
  low
}

export enum Volume {
  high,
  mid,
  low
}

export enum Subdivision {
  quarter = 1,
  eight,
  sixteen = 4
}
