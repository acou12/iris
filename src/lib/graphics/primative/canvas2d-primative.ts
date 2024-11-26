import { p, Point } from '../point/point';
import type { PrimativeDrawer } from './primative';

export class Canvas2DPrimativeDrawer implements PrimativeDrawer {
	context: CanvasRenderingContext2D;

	constructor(private canvas: HTMLCanvasElement) {
		this.context = canvas.getContext('2d');
	}

	getCanvasDimensions(): Point {
		return p(this.canvas.width, this.canvas.height);
	}

	drawLine(from: Point, to: Point, style: { stroke: string; strokeWidth: number }): void {
		this.context.strokeStyle = style.stroke;
		this.context.lineWidth = style.strokeWidth;
		this.context.beginPath();
		this.context.moveTo(from.x, from.y);
		this.context.lineTo(to.x, to.y);
		this.context.stroke();
		this.context.closePath();
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
		this.context.closePath();
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
		this.context.closePath();
	}

	drawText(
		text: string,
		center: Point,
		style: {
			fill: string;
		}
	) {
		this.context.fillStyle = style.fill;
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.font = '20px monospace';
		this.context.fillText(text, center.x, center.y);
	}
}
