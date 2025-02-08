import type { Point } from '../point/point';

export enum MathAlign {
	LEFT,
	CENTER
}

export type MathElementStyle = {
	/** a css color representing the text color (the color attribute) of this element. */
	color: string;
};

export interface MathRenderer<K> {
	addElement(
		key: K,
		initialText: string,
		position: Point,
		style: MathElementStyle,
		align: MathAlign
	): void;
	removeElement(key: K): void;
	moveElement(key: K, position: Point): void;
	setElementText(key: K, text: string): void;
	setElementStyle(key: K, style: MathElementStyle);
	update(delta: number): void;
	destroy(): void;
}
