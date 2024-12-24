import { Edge } from './edge';

export class UndirectedEdgeMap<V, T> {
	directedMap: Map<string, T>;

	constructor() {
		this.directedMap = new Map();
	}

	has(edge: Edge<V>): boolean {
		return this.directedMap.has(edge.toString());
	}

	set(edge: Edge<V>, item: T): void {
		this.directedMap.set(edge.toString(), item);
		this.directedMap.set(edge.reversed().toString(), item);
	}

	get(edge: Edge<V>): T | undefined {
		return this.directedMap.get(edge.toString());
	}

	delete(edge: Edge<V>) {
		this.directedMap.delete(edge.toString());
		this.directedMap.delete(edge.reversed().toString());
	}
}
