import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
import type { Algorithm } from '../algorithm';

import { Edge } from '$lib/graphics/graph/edge';
import { Color } from '$lib/graphics/graph/color/color';

const FRINGE_COLOR = new Color(252, 38, 235);
const VISITED_COLOR = new Color(13, 122, 255);
const DONE_COLOR = new Color(230, 230, 230);

export class FringeSearch<T> implements Algorithm<T> {
	private fringe: [T, T][];
	private visited: Set<T>;
	private graph: GraphAnimator<T>;

	constructor(graph: GraphAnimator<T>) {
		this.graph = graph;
	}

	public initalize(start: T): void {
		this.fringe = [[undefined, start]];
		this.visited = new Set();
		this.graph.colorVertex(start, FRINGE_COLOR);
	}

	public hasTerminated() {
		return this.fringe.length == 0;
	}

	public step(): void {
		const [prev, next] = this.fringe.shift();
		if (this.visited.has(next)) {
			if (prev !== undefined) {
				this.graph.colorEdge(new Edge(prev, next), DONE_COLOR);
			}
		} else {
			this.visited.add(next);
			this.graph.colorVertex(next, VISITED_COLOR);
			if (prev !== undefined) {
				this.graph.colorEdge(new Edge(prev, next), VISITED_COLOR);
			}
			this.graph.colorVertex(next, VISITED_COLOR);
			for (const e of this.graph.getGraph().getAdjacent(next)) {
				if (!this.visited.has(e.getTo())) {
					this.fringe.push([e.getFrom(), e.getTo()]);
					this.graph.colorVertex(e.getTo(), FRINGE_COLOR);
					this.graph.colorEdge(e, FRINGE_COLOR);
				}
			}
		}
	}
}
