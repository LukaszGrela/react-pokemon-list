export enum ERGBADataIndex {
  R = 0,
  G = 1,
  B = 2,
  A = 3,
}
export type TRGBAData = [r: number, g: number, b: number, a: number];

export type TThresholdFunction = (
  x: number,
  y: number,
  data: TRGBAData
) => boolean;
