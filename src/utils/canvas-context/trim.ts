import { ERGBADataIndex } from './types';
import type { TThresholdFunction } from './types';
import { Rect } from './Rect';

export const trim = (
  context: CanvasRenderingContext2D,
  threshold: TThresholdFunction
): Rect => {
  const { width, height } = context.canvas;
  const imageData = context.getImageData(0, 0, width, height);
  // top
  let t = -1,
    r = -1,
    b = -1,
    l = -1;
  topTrim: for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      if (
        threshold(x, y, [
          imageData.data[pos * 4 + ERGBADataIndex.R],
          imageData.data[pos * 4 + ERGBADataIndex.G],
          imageData.data[pos * 4 + ERGBADataIndex.B],
          imageData.data[pos * 4 + ERGBADataIndex.A],
        ])
      ) {
        t = y;
        break topTrim;
      }
    }
  }
  if (t === -1) {
    // went through all pixels, hasn't stop
    return new Rect(0, 0, 0, 0);
  }

  rightTrim: for (let x = width; --x >= 0;) {
    for (let y = t; y < height; y++) {
      const pos = y * width + x;
      if (
        threshold(x, y, [
          imageData.data[pos * 4 + ERGBADataIndex.R],
          imageData.data[pos * 4 + ERGBADataIndex.G],
          imageData.data[pos * 4 + ERGBADataIndex.B],
          imageData.data[pos * 4 + ERGBADataIndex.A],
        ])
      ) {
        r = x + 1;
        break rightTrim;
      }
    }
  }
  if (r === -1) r = width;

  bottomTrim: for (let y = height; --y >= t;) {
    for (let x = r; --x >= 0;) {
      const pos = y * width + x;
      if (
        threshold(x, y, [
          imageData.data[pos * 4 + ERGBADataIndex.R],
          imageData.data[pos * 4 + ERGBADataIndex.G],
          imageData.data[pos * 4 + ERGBADataIndex.B],
          imageData.data[pos * 4 + ERGBADataIndex.A],
        ])
      ) {
        b = y + 1;
        break bottomTrim;
      }
    }
  }
  if (b === -1) b = height;


  leftTrim: for (let x = 0; x < r; x++) {
    for (let y = b; --y >= t;) {
      const pos = y * width + x;
      if (
        threshold(x, y, [
          imageData.data[pos * 4 + ERGBADataIndex.R],
          imageData.data[pos * 4 + ERGBADataIndex.G],
          imageData.data[pos * 4 + ERGBADataIndex.B],
          imageData.data[pos * 4 + ERGBADataIndex.A],
        ])
      ) {
        l = x;
        break leftTrim;
      }
    }
  }
  if (l === -1) l = 0;

  return new Rect(t, r, b, l);
};
