import { TRGBAData } from "./canvas-context";

export type TRGBA = number;
export const rgbaToChannels = (color: TRGBA): TRGBAData => {
  return [
    (color >> 24) & 0xff,
    (color >> 16) & 0xff,
    (color >> 8) & 0xff,
    (color >> 0) & 0xff,
  ];
};
export type TRGB = number;
export const rgbToChannels = (
  color: TRGB
): [r: number, g: number, b: number, a: 255] => {
  return [(color >> 16) & 0xff, (color >> 8) & 0xff, (color >> 0) & 0xff, 255];
};
