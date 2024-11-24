import { Point } from '../point/point';

export interface PrimativeDrawer {
	drawLine(
		from: Point,
		to: Point,
		style: {
			stroke: string;
			strokeWidth: number;
		}
	): void;
	drawRect(
		topLeft: Point,
		bottomRight: Point,
		style: {
			fill: string;
			stroke: string;
			strokeWidth: number;
		}
	): void;
	drawCircle(
		at: Point,
		radius: number,
		style: {
			fill: string;
			stroke: string;
			strokeWidth: number;
		}
	): void;
}
