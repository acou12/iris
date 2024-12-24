import type { Graph } from './graph';
import { Edge } from './edge';
import { UndirectedEdgeMap } from './edge-map';

export class StandardGraph<V> implements Graph<V> {
	private vertexSet: Set<V>;
	private adjMap: Map<V, Edge<V>[]>;
	private weightMap: UndirectedEdgeMap<V, number>;

	constructor() {
		this.vertexSet = new Set();
		this.adjMap = new Map();
		this.weightMap = new UndirectedEdgeMap();
	}

	addVertex(v: V): void {
		this.vertexSet.add(v);
		this.adjMap.set(v, []);
	}

	addEdge(edge: Edge<V>, weight: number): void {
		this.adjMap.get(edge.getFrom()).push(edge);
		this.adjMap.get(edge.getTo()).push(edge.reversed());
		this.weightMap.set(edge, weight);
		this.weightMap.set(edge.reversed(), weight);
	}

	getAdjacent(v: V): Edge<V>[] {
		return this.adjMap.get(v);
	}

	getAllVertices(): Set<V> {
		return this.vertexSet;
	}

	getAllEdges(): Edge<V>[] {
		return [...this.adjMap.values()].flat();
	}

	getWeight(e: Edge<V>): number {
		return this.weightMap.get(e);
	}

	setWeight(e: Edge<V>, weight: number): void {
		this.weightMap.set(e, weight);
		this.weightMap.set(e.reversed(), weight);
	}
}
