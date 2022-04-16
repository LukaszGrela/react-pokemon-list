export class Rect {
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;
  public readonly trbl: [t: number, r: number, b: number, l: number];
  public readonly xywh: [x: number, y: number, w: number, h: number]

  constructor(
    public readonly top: number,
    public readonly right: number,
    public readonly bottom: number,
    public readonly left: number
  ) {
    this.x = left;
    this.y = top;
    this.width = Math.abs(right - left);
    this.height = Math.abs(bottom - top);

    this.trbl = [this.top, this.right, this.bottom, this.left];
    this.xywh = [this.x, this.y, this.width, this.height];
  }

  public isEmpty(): boolean {
    return this.width <= 0 || this.height <= 0;
  }


  public toTRBL(): string {
    return `${this.trbl.join()}`
  }
  public toXYWH(): string {
    return `${this.xywh.join()}`
  }

  toString(): string {
    return `Rect: trbl=${this.toTRBL()}|xywh=${this.toXYWH()}`
  }
}
