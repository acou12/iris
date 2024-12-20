import { PrimsMSTAlgorithm } from '$lib/content/foundations/graph-algorithms/weighted/prims';
import { equalArrays } from '$lib/util/array';
import { Color } from './color/color';
import type { AnimatedGraph } from './animated-graph';
import type { GraphInteractor } from './interactor/graph-interactor';
import { StandardGraphInteractor } from './interactor/standard-graph-interactor';

const CYCLE_COLOR = new Color(255, 100, 0);

export class HoverMSTGraph {
	mstAlgorithm: PrimsMSTAlgorithm<number>;
	interactor: GraphInteractor<number>;
	addedEdge: [number, number] | undefined;
	cycle: Set<[number, number]>;

	constructor(private graph: AnimatedGraph<number>) {
		this.mstAlgorithm = new PrimsMSTAlgorithm(graph);
		this.mstAlgorithm.initalize(0);

		while (!this.mstAlgorithm.hasTerminated()) {
			this.mstAlgorithm.step();
		}

		this.interactor = new StandardGraphInteractor(graph);
		this.addedEdge = undefined;
		this.cycle = new Set();
	}

	update(delta: number): void {
		this.graph.update(delta);

		this.interactor.update(delta);

		const hoverEdge = this.interactor.getHoverEdge();

		if (!equalArrays(hoverEdge, this.addedEdge)) {
			if (hoverEdge === undefined) {
				this.addedEdge = undefined;
				this.cycle = new Set();
			} else {
				const [u, v] = hoverEdge;
				if (this.mstAlgorithm.tree.get(u) !== v && this.mstAlgorithm.tree.get(v) !== u) {
					this.addedEdge = hoverEdge;
					this.cycle = new Set();
					this.cycle.add([u, v]);
					let p1 = u;
					let p2 = v;
					while (p1 !== p2) {
						if (this.mstAlgorithm.height.get(p1) < this.mstAlgorithm.height.get(p2)) {
							const p2Parent = this.mstAlgorithm.tree.get(p2);
							this.cycle.add([p2Parent, p2]);
							p2 = p2Parent;
						} else {
							const p1Parent = this.mstAlgorithm.tree.get(p1);
							this.cycle.add([p1Parent, p1]);
							p1 = p1Parent;
						}
					}
				}
			}
		}

		for (const [u, v, _w] of this.graph.getAllEdges()) {
			this.graph.colorEdge([u, v], new Color(240, 240, 240));
			this.graph.colorVertex(u, new Color(13, 122, 255));
			this.graph.colorVertex(v, new Color(13, 122, 255));
		}

		for (const edge of this.mstAlgorithm.tree) {
			if (edge[1] !== undefined) {
				this.graph.colorEdge(edge, new Color(13, 122, 255));
			}
		}

		for (const cycleEdge of this.cycle) {
			this.graph.colorEdge(cycleEdge, CYCLE_COLOR);
			this.graph.colorVertex(cycleEdge[0], CYCLE_COLOR);
			this.graph.colorVertex(cycleEdge[1], CYCLE_COLOR);
		}
	}

	draw(): void {
		this.graph.draw();
	}
}
