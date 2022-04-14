export type TRGBA = number;
export const rgbaToChannels = (color: TRGBA): [r: number, g: number, b: number, a: number] => {
  return [
    (color >> 24) & 0xFF,
    (color >> 16) & 0xFF,
    (color >> 8) & 0xFF,
    (color >> 0) & 0xFF]
}
export type TRGB = number;
export const rgbToChannels = (color: TRGB): [r: number, g: number, b: number, a: 255] => {
  return [
    (color >> 16) & 0xFF,
    (color >> 8) & 0xFF,
    (color >> 0) & 0xFF,
    255]
}