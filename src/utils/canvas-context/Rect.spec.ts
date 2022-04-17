import { Rect } from './Rect';

describe('utils', () => {
  describe('canvas-context', () => {
    describe('Rect', () => {
      type TTestCase = [
        name: string,
        t: number,
        r: number,
        b: number,
        l: number,
        x: number,
        y: number,
        w: number,
        h: number,
        empty: boolean
      ];
      test.each<TTestCase>([
        ['0,0,0,0', 0, 0, 0, 0, 0, 0, 0, 0, true],
        ['0,1,1,0', 0, 1, 1, 0, 0, 0, 1, 1, false],
        ['0,2,2,0', 0, 2, 2, 0, 0, 0, 2, 2, false],
        ['0,3,3,0', 0, 3, 3, 0, 0, 0, 3, 3, false],
        ['1,1,1,1', 1, 1, 1, 1, 1, 1, 0, 0, true],
        ['1,2,2,1', 1, 2, 2, 1, 1, 1, 1, 1, false],
        ['1,3,3,1', 1, 3, 3, 1, 1, 1, 2, 2, false],
        ['1,4,3,0', 1, 4, 3, 0, 0, 1, 4, 2, false],
        ['1,4,4,0', 1, 4, 4, 0, 0, 1, 4, 3, false],
        ['1,3,4,0', 1, 3, 4, 0, 0, 1, 3, 3, false],

        ['2,3,3,2', 2, 3, 3, 2, 2, 2, 1, 1, false],
        ['1,0,2,-1', 1, 0, 2, -1, -1, 1, 1, 1, false],
        ['3,3,3,1', 3, 3, 3, 1, 1, 3, 2, 0, true],
        ['3,3,4,1', 3, 3, 4, 1, 1, 3, 2, 1, false],
        ['-1,0,0,-1', -1, 0, 0, -1, -1, -1, 1, 1, false],
        ['-1,-1,-1,-1', -1, -1, -1, -1, -1, -1, 0, 0, true],
        ['-1,-1,0,0', -1, -1, 0, 0, 0, -1, 1, 1, false],
        ['-2,-1,-1,-2', -2, -1, -1, -2, -2, -2, 1, 1, false],
        ['-5,-3,-5,-3', -5, -3, -5, -3, -3, -5, 0, 0, true],
        ['-5,-3,-4,-2', -5, -3, -4, -2, -2, -5, 1, 1, false],
        ['0,3,0,0', 0, 3, 0, 0, 0, 0, 3, 0, true],
        ['0,3,1,0', 0, 3, 1, 0, 0, 0, 3, 1, false],
      ])(
        'Creates valid rect with correct size for TRBL %s',
        (trbl, t, r, b, l, x, y, w, h, empty) => {
          const rect = new Rect(t, r, b, l);
          expect(rect.toTRBL()).toEqual(trbl);
          expect(rect.toXYWH()).toEqual(`${x},${y},${w},${h}`);
          expect(rect.top).toEqual(t);
          expect(rect.right).toEqual(r);
          expect(rect.bottom).toEqual(b);
          expect(rect.left).toEqual(l);
          expect(rect.x).toEqual(x);
          expect(rect.y).toEqual(y);
          expect(rect.width).toEqual(w);
          expect(rect.height).toEqual(h);
          expect(rect.isEmpty()).toEqual(empty);
        }
      );

      it('Creates empty Rect', () => {
        const rect = new Rect(0, 0, 0, 0);
        expect(rect.top).toBe(0);
        expect(rect.right).toBe(0);
        expect(rect.bottom).toBe(0);
        expect(rect.left).toBe(0);
        expect(rect.x).toBe(0);
        expect(rect.y).toBe(0);
        expect(rect.width).toBe(0);
        expect(rect.height).toBe(0);
        expect(rect.isEmpty()).toBeTruthy();
      });

      it('Creates valid Rect', () => {
        const rect = new Rect(0, 100, 200, 0);
        expect(rect.top).toBe(0);
        expect(rect.right).toBe(100);
        expect(rect.bottom).toBe(200);
        expect(rect.left).toBe(0);
        expect(rect.x).toBe(0);
        expect(rect.y).toBe(0);
        expect(rect.width).toBe(100);
        expect(rect.height).toBe(200);
        expect(rect.isEmpty()).toBeFalsy();
      });

      it('Creates valid offset Rect', () => {
        const rect = new Rect(10, 100, 200, 10);
        expect(rect.top).toBe(10);
        expect(rect.right).toBe(100);
        expect(rect.bottom).toBe(200);
        expect(rect.left).toBe(10);
        expect(rect.x).toBe(10);
        expect(rect.y).toBe(10);
        expect(rect.width).toBe(90);
        expect(rect.height).toBe(190);
        expect(rect.isEmpty()).toBeFalsy();
      });

      it('Creates valid negative offset Rect', () => {
        const rect = new Rect(10, -100, -200, 10);
        expect(rect.top).toBe(10);
        expect(rect.right).toBe(-100);
        expect(rect.bottom).toBe(-200);
        expect(rect.left).toBe(10);
        expect(rect.x).toBe(10);
        expect(rect.y).toBe(10);
        expect(rect.width).toBe(110);
        expect(rect.height).toBe(210);
        expect(rect.isEmpty()).toBeFalsy();
      });

      it('returns correct toTRBL', () => {
        expect(new Rect(0, 0, 0, 0).toTRBL()).toEqual('0,0,0,0');
        expect(new Rect(1, 1, 1, 1).toTRBL()).toEqual('1,1,1,1');
        expect(new Rect(-1, -1, -1, -1).toTRBL()).toEqual('-1,-1,-1,-1');
        expect(new Rect(-1, 0, 0, -1).toTRBL()).toEqual('-1,0,0,-1');
      });
      it('returns correct toXYWH', () => {
        expect(new Rect(0, 0, 0, 0).toXYWH()).toEqual('0,0,0,0');
        expect(new Rect(1, 1, 1, 1).toXYWH()).toEqual('1,1,0,0');
        expect(new Rect(1, 2, 2, 1).toXYWH()).toEqual('1,1,1,1');
        expect(new Rect(-1, -1, -1, -1).toXYWH()).toEqual('-1,-1,0,0');
        expect(new Rect(-1, 0, 0, -1).toXYWH()).toEqual('-1,-1,1,1');
      });
      it('returns correct toString', () => {
        expect(new Rect(0, 0, 0, 0).toString()).toEqual(
          'Rect: trbl=0,0,0,0|xywh=0,0,0,0'
        );
        expect(new Rect(1, 1, 1, 1).toString()).toEqual(
          'Rect: trbl=1,1,1,1|xywh=1,1,0,0'
        );
        expect(new Rect(1, 2, 2, 1).toString()).toEqual(
          'Rect: trbl=1,2,2,1|xywh=1,1,1,1'
        );
        expect(new Rect(-1, -1, -1, -1).toString()).toEqual(
          'Rect: trbl=-1,-1,-1,-1|xywh=-1,-1,0,0'
        );
        expect(new Rect(-1, 0, 0, -1).toString()).toEqual(
          'Rect: trbl=-1,0,0,-1|xywh=-1,-1,1,1'
        );
      });
    });
  });
});
