import type { Point } from '../point/point';
import type { Color } from './color/color';

/**
 * This class stores information about a graph as
 * well as information about visual characteristics
 * of its edges and vertices.
 */
export interface AnimatedGraph<V> {
	addVertex(v: V, location: Point): void;
	addEdge(v1: V, v2: V, w: number): void;
	getAdjacent(v: V): [V, V, number][];

	getAllVertices(): Set<V>;
	getAllEdges(): [V, V, number][];

	getWeight(e: [V, V]): number;
	setWeight(e: [V, V], weight: number): void;

	colorEdge(e: [V, V], color: Color): void;
	colorVertex(v: V, color: Color): void;

	getVertexLocation(v: V): Point;
	setVertexLocation(v: V, p: Point): void;

	getCanvas(): HTMLCanvasElement;

	update(delta: number): void;
	draw(): void;
}
