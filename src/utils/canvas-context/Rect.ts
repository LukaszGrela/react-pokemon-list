export class Rect {
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;

  constructor(
    public readonly top: number,
    public readonly right: number,
    public readonly bottom: number,
    public readonly left: number
  ) {
    this.x = left;
    this.y = top;
    this.width = right - left;
    this.height = bottom - top;
  }

  public isEmpty(): boolean {
    return this.width <= 0 || this.height <= 0;
  }
}
