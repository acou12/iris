import { Color } from '$lib/graphics/graph/color/color';
import type { AnimatedGraph } from '$lib/graphics/graph/animated-graph';
import type { Algorithm } from '../algorithm';

const FRINGE_COLOR = new Color(252, 38, 235);
const VISITED_COLOR = new Color(13, 122, 255);
const DONE_COLOR = new Color(230, 230, 230);

export class PrimsMSTAlgorithm<T> implements Algorithm<T> {
	private fringe: [T, T, number][];
	private visited: Set<T>;
	public tree: Map<T, T>;
	public height: Map<T, number>;
	private graph: AnimatedGraph<T>;

	constructor(graph: AnimatedGraph<T>) {
		this.graph = graph;
	}

	public initalize(start: T): void {
		this.fringe = [[undefined, start, 0]];
		this.visited = new Set();
		this.tree = new Map();
		this.height = new Map();
		this.height.set(start, 0);
		this.graph.colorVertex(start, FRINGE_COLOR);
	}

	public hasTerminated() {
		return this.fringe.length == 0;
	}

	public step(): void {
		const nextIndex = this.fringe.indexOf(
			this.fringe.reduce((acc, x) => (x[2] <= acc[2] ? x : acc))
		);
		const [prev, next, _dist] = this.fringe.splice(nextIndex, 1)[0];
		if (this.visited.has(next)) {
			if (prev !== undefined) {
				this.graph.colorEdge([prev, next], DONE_COLOR);
			}
		} else {
			this.tree.set(next, prev);
			if (prev !== undefined) {
				this.height.set(next, this.height.get(prev) + 1);
			}
			this.visited.add(next);
			this.graph.colorVertex(next, VISITED_COLOR);
			if (prev !== undefined) {
				this.graph.colorEdge([prev, next], VISITED_COLOR);
			}
			this.graph.colorVertex(next, VISITED_COLOR);
			for (const [_, adj, weight] of this.graph.getAdjacent(next)) {
				if (!this.visited.has(adj)) {
					this.fringe.push([next, adj, weight]);
					this.graph.colorVertex(adj, FRINGE_COLOR);
					this.graph.colorEdge([next, adj], FRINGE_COLOR);
				}
			}
		}
	}
}
