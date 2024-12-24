import type { Point } from '../../point/point';
import type { Color } from '../color/color';
import type { Graph } from '../graph';
import { Edge } from '../edge';

/**
 * This class represents a graph drawing. Each vertex
 * is associated with a physical location in the canvas
 * and vertices and edges are associated with colors. These
 * colors are slowly animated after each change.
 */
export interface GraphAnimator<V> {
	/**
	 * Set the color of a vertex in the drawing.
	 */
	colorVertex(v: V, color: Color): void;

	/**
	 * Set the color of an edge in the drawing.
	 */
	colorEdge(e: Edge<V>, color: Color): void;

	/**
	 * Get the canvas location of a vertex.
	 */
	getVertexLocation(v: V): Point;

	/**
	 * Update the canvas location of a vertex.
	 */
	setVertexLocation(v: V, location: Point): void;

	/**
	 * Get the canvas that this graph is being drawn onto.
	 */
	getCanvas(): HTMLCanvasElement;

	getGraph(): Graph<V>;

	update(delta: number): void;
	draw(): void;
}
