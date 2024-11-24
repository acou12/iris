import { Point } from '../point/point';
import type { PrimativeDrawer } from './primative';

export class Canvas2DPrimativeDrawer implements PrimativeDrawer {
	constructor(private context: CanvasRenderingContext2D) {}

	drawLine(from: Point, to: Point, style: { stroke: string; strokeWidth: number }): void {
		this.context.strokeStyle = style.stroke;
		this.context.lineWidth = style.strokeWidth;
		this.context.beginPath();
		this.context.moveTo(from.x, from.y);
		this.context.lineTo(to.x, to.y);
		this.context.stroke();
	}

	drawRect(
		topLeft: Point,
		bottomRight: Point,
		style: { fill: string; stroke: string; strokeWidth: number }
	): void {
		this.context.fillStyle = style.fill;
		this.context.strokeStyle = style.stroke;
		this.context.lineWidth = style.strokeWidth;
		this.context.beginPath();
		this.context.rect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
		this.context.fill();
		this.context.stroke();
	}

	drawCircle(
		at: Point,
		radius: number,
		style: { fill: string; stroke: string; strokeWidth: number }
	): void {
		this.context.fillStyle = style.fill;
		this.context.strokeStyle = style.stroke;
		this.context.lineWidth = style.strokeWidth;
		this.context.beginPath();
		this.context.ellipse(at.x, at.y, radius, radius, 0, 0, Math.PI * 2);
		this.context.fill();
		this.context.stroke();
	}
}
