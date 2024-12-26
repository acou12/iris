import katex from 'katex';
import type { Point } from '../point/point';
import { MathAlign, type MathElementStyle, type MathRenderer } from './math-renderer';

class KaTeXMathObject {
	private element: HTMLDivElement;

	constructor(
		text: string,
		position: Point,
		private canvas: HTMLCanvasElement,
		style: MathElementStyle,
		private align: MathAlign
	) {
		this.element = document.createElement('div');
		document.body.appendChild(this.element);

		this.element.style.transition = 'color 0.5s';
		this.element.style.fontSize = '24px';

		this.setText(text);
		this.setStyle(style);
		this.setPosition(position);
	}

	setPosition(position: Point) {
		this.element.style.position = 'absolute';
		const boundingBox = this.element.getBoundingClientRect();

		let offsetX: number, offsetY: number;

		if (this.align === MathAlign.CENTER) {
			offsetX = boundingBox.width / 2;
			offsetY = boundingBox.height / 2;
		} else {
			offsetX = 0;
			offsetY = 0;
		}

		this.element.style.left = `${position.x + this.canvas.offsetLeft - offsetX}px`;
		this.element.style.top = `${position.y + this.canvas.offsetTop - offsetY - 3}px`;
	}

	setText(text: string): void {
		this.element.innerHTML = katex.renderToString(text);
	}

	setStyle(style: MathElementStyle) {
		this.element.style.color = style.color;
	}

	remove() {
		this.element.remove();
	}
}

export class KaTeXMathRenderer<K> implements MathRenderer<K> {
	map: Map<K, KaTeXMathObject>;
	nextId: number;
	canvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement) {
		this.map = new Map();
		this.nextId = 0;
		this.canvas = canvas;
	}

	addElement(
		key: K,
		initialText: string,
		position: Point,
		style: MathElementStyle,
		align: MathAlign = MathAlign.CENTER
	): number {
		const id = this.nextId;
		this.nextId++;
		this.map.set(key, new KaTeXMathObject(initialText, position, this.canvas, style, align));
		return id;
	}

	removeElement(key: K) {
		this.map.get(key).remove();
		this.map.delete(key);
	}

	moveElement(key: K, position: Point) {
		this.map.get(key).setPosition(position);
	}

	setElementText(key: K, text: string) {
		this.map.get(key).setText(text);
	}

	setElementStyle(key: K, style: MathElementStyle) {
		this.map.get(key).setStyle(style);
	}
}
