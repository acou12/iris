import { Edge } from './edge';

/**
 * This represents a mathematical graph that is
 * weighted and directed.
 *
 * More precisely, this represents a graph G = (V, E)
 * equipped with a function w: E -> Real.
 */
export interface Graph<V> {
	addVertex(v: V): void;
	addEdge(edge: Edge<V>, weight: number): void;
	getAdjacent(v: V): Edge<V>[];

	getAllVertices(): Set<V>;
	getAllEdges(): Edge<V>[];

	getWeight(e: Edge<V>): number;
	setWeight(e: Edge<V>, weight: number): void;
}
