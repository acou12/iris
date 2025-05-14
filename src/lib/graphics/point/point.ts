export class Point {
	constructor(public x: number, public y: number) {}
	add(other: Point) {
		return new Point(this.x + other.x, this.y + other.y);
	}
	multiply(scalar: number) {
		return new Point(this.x * scalar, this.y * scalar);
	}
	length() {
		return Math.hypot(this.x, this.y);
	}
	copy() {
		return this.multiply(1);
	}
}

export const p = (x: number, y: number) => {
	return new Point(x, y);
};

export const dist = (p1: Point, p2: Point): number => {
	return Math.hypot(p1.x - p2.x, p1.y - p2.y);
};
