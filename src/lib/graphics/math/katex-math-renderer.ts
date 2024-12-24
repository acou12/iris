import katex from 'katex';
import type { Point } from '../point/point';
import type { MathRenderer } from './math-renderer';

class KaTeXMathObject {
	private element: HTMLDivElement;

	constructor(text: string, position: Point, private canvas: HTMLCanvasElement) {
		this.element = document.createElement('div');
		this.element.innerHTML = katex.renderToString(text);

		this.element.style.color = 'white';
		this.element.style.fontSize = '24px';

		document.body.appendChild(this.element);

		const boundingBox = this.element.getBoundingClientRect();
		this.element.style.position = 'absolute';
		this.element.style.left = `${position.x + canvas.offsetLeft - boundingBox.width / 2}px`;
		this.element.style.top = `${position.y + canvas.offsetTop - boundingBox.height / 2 - 3}px`;

		console.log(this.element);
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

	addElement(key: K, initialText: string, position: Point): number {
		const id = this.nextId;
		this.nextId++;
		this.map.set(key, new KaTeXMathObject(initialText, position, this.canvas));
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
}
