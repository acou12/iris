import katex from 'katex';
import type { Point } from '../point/point';
import type { MathElementStyle, MathRenderer } from './math-renderer';

class KaTeXMathObject {
	private element: HTMLDivElement;

	constructor(
		text: string,
		position: Point,
		private canvas: HTMLCanvasElement,
		style: MathElementStyle
	) {
		this.element = document.createElement('div');
		this.element.innerHTML = katex.renderToString(text);

		this.element.style.color = style.color;
		this.element.style.fontSize = '24px';
		this.element.style.transition = 'color 0.5s';

		document.body.appendChild(this.element);

		this.element.style.position = 'absolute';

		const boundingBox = this.element.getBoundingClientRect();

		this.element.style.left = `${position.x + this.canvas.offsetLeft - boundingBox.width / 2}px`;
		this.element.style.top = `${position.y + this.canvas.offsetTop - boundingBox.height / 2 - 3}px`;
	}

	setPosition(position: Point) {
		const boundingBox = this.element.getBoundingClientRect();
		this.element.style.position = 'absolute';
		this.element.style.left = `${position.x + this.canvas.offsetLeft - boundingBox.width / 2}px`;
		this.element.style.top = `${position.y + this.canvas.offsetTop - boundingBox.height / 2 - 3}px`;
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

	addElement(key: K, initialText: string, position: Point, style: MathElementStyle): number {
		const id = this.nextId;
		this.nextId++;
		this.map.set(key, new KaTeXMathObject(initialText, position, this.canvas, style));
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
