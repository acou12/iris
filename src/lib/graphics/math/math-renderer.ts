import type { Point } from '../point/point';

export interface MathRenderer<K> {
	addElement(key: K, initialText: string, position: Point): void;
	removeElement(key: K): void;
	moveElement(key: K, position: Point): void;
	setElementText(key: K, text: string): void;
}
