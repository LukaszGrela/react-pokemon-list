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
    t = y;
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
        break topTrim;
      }
    }
  }

  console.log('t', t);
  if (t === height - 1) {
    // bail out, as it means we went through all pixels
    return new Rect(0, 0, 0, 0);
    //
  }

  rightTrim: for (let x = width; --x >= 0; ) {
    r = x;
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
        break rightTrim;
      }
    }
  }
  console.log('r', r);
  if (r === 0) {
    // bail out we've scanned from right to left
    return new Rect(0, width, t, 0);
  }

  bottomTrim: for (let y = height; --y >= t; ) {
    b = y;
    for (let x = r; --x >= 0; ) {
      const pos = y * width + x;
      if (
        threshold(x, y, [
          imageData.data[pos * 4 + ERGBADataIndex.R],
          imageData.data[pos * 4 + ERGBADataIndex.G],
          imageData.data[pos * 4 + ERGBADataIndex.B],
          imageData.data[pos * 4 + ERGBADataIndex.A],
        ])
      ) {
        break bottomTrim;
      }
    }
  }

  console.log('b', b);
  if (b === -1) b = height;

  leftTrim: for (let x = 0; x < r; x++) {
    l = x;
    for (let y = b; --y >= t; ) {
      const pos = y * width + x;
      if (
        threshold(x, y, [
          imageData.data[pos * 4 + ERGBADataIndex.R],
          imageData.data[pos * 4 + ERGBADataIndex.G],
          imageData.data[pos * 4 + ERGBADataIndex.B],
          imageData.data[pos * 4 + ERGBADataIndex.A],
        ])
      ) {
        break leftTrim;
      }
    }
  }
  console.log('l', l);

  if (l === -1) l = 0;

  return new Rect(t, r, b, l);
};
