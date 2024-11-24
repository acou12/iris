export class Point {
	constructor(public x: number, public y: number) {}
	add(other: Point) {
		return new Point(this.x + other.x, this.y + other.y);
	}
}

export const p = (x: number, y: number) => {
	return new Point(x, y);
};
