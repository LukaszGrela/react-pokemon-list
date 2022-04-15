export enum ERGBADataIndex {
  R,
  G,
  B,
  A,
}
export type TRGBAData = [r: number, g: number, b: number, a: number];

export type TThresholdFunction = (
  x: number,
  y: number,
  data: TRGBAData
) => boolean;