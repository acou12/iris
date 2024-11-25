import { Point } from '../point/point';
import { Color } from './color/color';

/**
 * This class stores information about a graph as
 * well as information about visual characteristics
 * of its edges and vertices.
 */
export interface AnimatedGraph<V> {
	addVertex(v: V, location: Point): void;
	addEdge(v1: V, v2: V): void;
	getAdjacent(v: V): [V, V][];

	startAnimating(): void;
	stopAnimating(): void;

	colorEdge(e: [V, V], color: Color): void;
	colorVertex(v: V, color: Color): void;

	getVertexLocation(v: V): Point;
	setVertexLocation(v: V, p: Point): void;

	update(delta: number): void;
	draw(): void;
}
