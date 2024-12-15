import { Point } from '../point/point';

export interface MathRenderer<K> {
	addElement(key: K, initialText: string, position: Point);
	removeElement(key: K);
	moveElement(key: K, position: Point);
	setElementText(key: K, text: string);
}
