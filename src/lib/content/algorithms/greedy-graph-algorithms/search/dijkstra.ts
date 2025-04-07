import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
import type { Algorithm } from '../../algorithm';

import { Edge } from '$lib/graphics/graph/edge';
import { Color } from '$lib/graphics/graph/color/color';

const START_COLOR = new Color(120, 120, 120);
const FRINGE_COLOR = new Color(252, 38, 235);
const VISITED_COLOR = new Color(13, 122, 255);
const DONE_COLOR = new Color(230, 230, 230);

export class DijkstrasSearch<T> implements Algorithm<T> {
	private fringe: [T, T, number][];
	private visited: Set<T>;
	private graph: GraphAnimator<T>;

	constructor(graph: GraphAnimator<T>) {
		this.graph = graph;
	}

	public initalize(start: T): void {
		this.fringe = [[undefined, start, 0]];
		this.visited = new Set();
		this.graph.colorVertex(start, FRINGE_COLOR);
		this.graph
			.getGraph()
			.getAllVertices()
			.forEach((v) => this.graph.colorVertex(v, START_COLOR));
		this.graph
			.getGraph()
			.getAllEdges()
			.forEach((e) => this.graph.colorEdge(e, START_COLOR));
	}

	public hasTerminated() {
		return this.fringe.length == 0;
	}

	public step(): void {
		// const [prev, next, totalWeight] = this.fringe.shift();
		let smallestIndex = 0;
		for (let i = 1; i < this.fringe.length; i++) {
			if (this.fringe[i][2] < this.fringe[smallestIndex][2]) {
				smallestIndex = i;
			}
		}
		const [prev, next, totalWeight] = this.fringe.splice(smallestIndex, 1)[0];
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
					this.fringe.push([
						e.getFrom(),
						e.getTo(),
						totalWeight + this.graph.getGraph().getWeight(e)
					]);
					this.graph.colorVertex(e.getTo(), FRINGE_COLOR);
					this.graph.colorEdge(e, FRINGE_COLOR);
				}
			}
		}
	}
}
