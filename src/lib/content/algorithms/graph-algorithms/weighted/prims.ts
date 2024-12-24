import { Color } from '$lib/graphics/graph/color/color';
import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
import type { Algorithm } from '../algorithm';
import { Edge } from '$lib/graphics/graph/edge';

const FRINGE_COLOR = new Color(252, 38, 235);
const VISITED_COLOR = new Color(13, 122, 255);
const DONE_COLOR = new Color(230, 230, 230);

export class PrimsMSTAlgorithm<T> implements Algorithm<T> {
	private fringe: [T, T, number][];
	private visited: Set<T>;
	public tree: Map<T, T>;
	public height: Map<T, number>;
	private graph: GraphAnimator<T>;

	constructor(graph: GraphAnimator<T>) {
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
				this.graph.colorEdge(new Edge(prev, next), DONE_COLOR);
			}
		} else {
			this.tree.set(next, prev);
			if (prev !== undefined) {
				this.height.set(next, this.height.get(prev) + 1);
			}
			this.visited.add(next);
			this.graph.colorVertex(next, VISITED_COLOR);
			if (prev !== undefined) {
				this.graph.colorEdge(new Edge(prev, next), VISITED_COLOR);
			}
			this.graph.colorVertex(next, VISITED_COLOR);
			for (const edge of this.graph.getGraph().getAdjacent(next)) {
				if (!this.visited.has(edge.getTo())) {
					this.fringe.push([next, edge.getTo(), this.graph.getGraph().getWeight(edge)]);
					this.graph.colorVertex(edge.getTo(), FRINGE_COLOR);
					this.graph.colorEdge(edge, FRINGE_COLOR);
				}
			}
		}
	}
}
