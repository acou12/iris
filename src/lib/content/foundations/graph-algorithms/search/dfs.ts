import { Color } from '$lib/graphics/graph/color/color';
import type { AnimatedGraph } from '$lib/graphics/graph/graph';
import type { GraphSearcher } from './search';

const FRINGE_COLOR = new Color(252, 38, 235);
const VISITED_COLOR = new Color(13, 122, 255);
const DONE_COLOR = new Color(230, 230, 230);

export class DepthFirstSearcher<T> implements GraphSearcher<T> {
	private fringe: [T, T][];
	private visited: Set<T>;
	private graph: AnimatedGraph<T>;

	constructor(graph: AnimatedGraph<T>) {
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
		let [prev, next] = this.fringe.pop();
		if (this.visited.has(next)) {
			if (prev !== undefined) {
				this.graph.colorEdge([prev, next], DONE_COLOR);
			}
		} else {
			this.visited.add(next);
			this.graph.colorVertex(next, VISITED_COLOR);
			if (prev !== undefined) {
				this.graph.colorEdge([prev, next], VISITED_COLOR);
			}
			this.graph.colorVertex(next, VISITED_COLOR);
			for (const e of this.graph.getAdjacent(next)) {
				if (!this.visited.has(e[1])) {
					this.fringe.push(e);
					this.graph.colorVertex(e[1], FRINGE_COLOR);
					this.graph.colorEdge(e, FRINGE_COLOR);
				}
			}
		}
	}
}
