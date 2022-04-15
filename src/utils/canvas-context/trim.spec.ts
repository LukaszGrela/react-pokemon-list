import { Rect } from './Rect';
import { trim } from './trim';
import { ERGBADataIndex } from './types';

describe('utils', () => {
  describe('canvas-context', () => {
    describe('trim', () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });

      const canvas = document.createElement('canvas');
      canvas.width = 4;
      canvas.height = 4;

      type TTestCase = [
        desc: string,
        x: number,
        y: number,
        width: number,
        height: number,
        equals: Rect
      ];
      test.each<TTestCase>([
        ['full transparent', 0, 0, 0, 0, new Rect(0, 0, 0, 0)],
        ['full opaque', 0, 0, 4, 4, new Rect(0, 4, 4, 0)],
        ['first row transparent', 0, 1, 4, 3, new Rect(0, 0, 0, 0)],
        ['first row opaque', 0, 0, 4, 1, new Rect(0, 0, 0, 0)],
        ['top left pixel opaque', 0, 0, 1, 1, new Rect(0, 0, 0, 0)],
        ['top right pixel opaque', 0, 3, 1, 1, new Rect(0, 0, 0, 0)],
        ['bottom right pixel opaque', 3, 3, 1, 1, new Rect(0, 0, 0, 0)],
        ['bottom left pixel opaque', 0, 3, 1, 1, new Rect(0, 0, 0, 0)],
        ['border transparent', 1, 1, 3, 3, new Rect(0, 0, 0, 0)],
        ['top and right border transparent', 0, 1, 3, 3, new Rect(0, 0, 0, 0)],
      ])('Test trim %s canvas', (description, x, y, width, height, result) => {
        expect(canvas).toBeDefined();
        const context = canvas.getContext('2d');
        expect(context).toBeDefined();
        expect(context).not.toBeNull();
        // make image transparent
        context!.clearRect(0, 0, 4, 4);

        // make image opaque
        if (width > 0 && height > 0) {
          context!.fillStyle = 'black';
          context!.fillRect(x, y, width, height);
        }

        // set to not find any pixels to trim
        const threshold = jest.fn((x, y, data) => {
          // return true to stop trimming (found first non-transparent pixel)
          return data[ERGBADataIndex.A] > 0;
        });
        const rect = trim(context!, threshold);
        console.log('trim', rect);
        expect(rect).toEqual(result);
      });

      xit('runs single threshold pass, returns full image rect', () => {
        const canvas = document.createElement('canvas');
        canvas.width = 4;
        canvas.height = 4;

        expect(canvas).toBeDefined();
        const context = canvas.getContext('2d');
        expect(context).toBeDefined();
        expect(context).not.toBeNull();
        // make image opaque
        context!.fillStyle = 'black';
        context!.fillRect(0, 0, 4, 4);
        // set to not find any pixels to trim
        const threshold = jest.fn((x, y, data) => {
          // return true to stop trimming (found first non-transparent pixel)
          return data[ERGBADataIndex.A] > 0;
        });
        const rect = trim(context!, threshold);

        // it calls single pass width x height of threshold functions
        expect(threshold).toBeCalledTimes(4);
        expect(rect).toEqual({
          top: 0,
          right: 4,
          bottom: 4,
          left: 0,
          x: 0,
          y: 0,
          width: 4,
          height: 4,
        });
      });

      xit('runs single threshold pass, returns empty rect', () => {
        const canvas = document.createElement('canvas');
        canvas.width = 4;
        canvas.height = 4;
        expect(canvas).toBeDefined();
        const context = canvas.getContext('2d');
        expect(context).toBeDefined();
        expect(context).not.toBeNull();
        context!.clearRect(0, 0, 4, 4);
        // returns true
        const threshold = jest.fn((x, y, data) => {
          console.log(x, y, data[ERGBADataIndex.A]);
          // return true to stop trimming (found first non-transparent pixel)
          return data[ERGBADataIndex.A] > 0;
        });
        const rect = trim(context!, threshold);
        console.log(rect);
        // it calls single threshold call
        expect(threshold).toBeCalledTimes(16);
        expect(rect.isEmpty()).toBeTruthy();
      });
    });
  });
});
