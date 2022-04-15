import { Rect } from './Rect';

describe('utils', () => {
  describe('canvas-context', () => {
    describe('Rect', () => {
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

      it('Creates valid negative offset empty Rect', () => {
        const rect = new Rect(10, -100, -200, 10);
        expect(rect.top).toBe(10);
        expect(rect.right).toBe(-100);
        expect(rect.bottom).toBe(-200);
        expect(rect.left).toBe(10);
        expect(rect.x).toBe(10);
        expect(rect.y).toBe(10);
        expect(rect.width).toBe(-110);
        expect(rect.height).toBe(-210);
        expect(rect.isEmpty()).toBeTruthy();
      });
    });
  });
});
