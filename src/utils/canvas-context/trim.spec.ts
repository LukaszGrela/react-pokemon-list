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

      it('Test trim full transparent canvas', () => {
        const x = 0;
        const y = 0;
        const w = 0;
        const h = 0;
        const expected = new Rect(0, 0, 0, 0);

        expect(canvas).toBeDefined();
        const context = canvas.getContext('2d');
        expect(context).toBeDefined();
        expect(context).not.toBeNull();
        // make image transparent
        context!.clearRect(0, 0, 4, 4);

        // make image opaque
        if (w > 0 && h > 0) {
          context!.fillStyle = 'black';
          context!.fillRect(x, y, w, h);
        }

        // set to not find any pixels to trim
        const threshold = jest.fn((x, y, data) => {
          // return true to stop trimming (found first non-transparent pixel)
          return data[ERGBADataIndex.A] > 0;
        });
        const rect = trim(context!, threshold);

        expect(rect.toXYWH()).toEqual(expected.toXYWH());
      });

      test.each<TTestCase>([
        ['full opaque', 0, 0, 4, 4, new Rect(0, 4, 4, 0)],
        ['first row transparent', 0, 1, 4, 3, new Rect(1, 4, 4, 0)],
        ['first row opaque', 0, 0, 4, 1, new Rect(0, 4, 1, 0)],
        ['top left pixel opaque', 0, 0, 1, 1, new Rect(0, 1, 1, 0)],
        ['top right pixel opaque', 3, 0, 1, 1, new Rect(0, 4, 1, 3)],
        ['bottom right pixel opaque', 3, 3, 1, 1, new Rect(3, 4, 4, 3)],
        ['bottom left pixel opaque', 0, 3, 1, 1, new Rect(3, 1, 4, 0)],
        ['border transparent', 1, 1, 3, 3, new Rect(1, 4, 4, 1)],
        ['top and right border transparent', 0, 1, 3, 3, new Rect(1, 3, 4, 0)],
      ])('Test trim %s canvas', (_, x, y, w, h, expected) => {
        expect(canvas).toBeDefined();
        const context = canvas.getContext('2d');
        expect(context).toBeDefined();
        expect(context).not.toBeNull();
        // make image transparent
        context!.clearRect(0, 0, 4, 4);

        // make image opaque
        if (w > 0 && h > 0) {
          context!.fillStyle = 'black';
          context!.fillRect(x, y, w, h);
        }

        // set to not find any pixels to trim
        const threshold = jest.fn((x, y, data) => {
          // return true to stop trimming (found first non-transparent pixel)
          return data[ERGBADataIndex.A] > 0;
        });

        const rect = trim(context!, threshold);

        expect(rect.toXYWH()).toEqual(expected.toXYWH());

        // create trimmed image
        const trimmed = document.createElement('canvas');
        trimmed.width = rect.width;
        trimmed.height = rect.height;

        expect(trimmed).toBeDefined();

        const trimmedContext = trimmed.getContext('2d');
        expect(trimmedContext).toBeDefined();
        expect(trimmedContext).not.toBeNull();

        const { width, height } = trimmedContext!.getImageData(
          0,
          0,
          rect.width,
          rect.height
        );

        expect(width).toBeGreaterThan(0);
        expect(height).toBeGreaterThan(0);

        trimmedContext?.drawImage(
          canvas,
          rect.x,
          rect.y,
          rect.width,
          rect.height,
          0,
          0,
          rect.width,
          rect.height
        );

        expect(trim(trimmedContext!, threshold).xywh).toEqual([
          0,
          0,
          rect.width,
          rect.height,
        ]);
      });
    });
  });
});
