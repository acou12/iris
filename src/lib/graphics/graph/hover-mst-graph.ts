import { PrimsMSTAlgorithm } from '$lib/content/algorithms/graph-algorithms/weighted/prims';
import { equalArrays } from '$lib/util/array';
import { Color } from './color/color';
import type { AnimatedGraph } from './animated-graph';
import type { GraphInteractor } from './interactor/graph-interactor';
import { StandardGraphInteractor } from './interactor/standard-graph-interactor';
import { Edge } from './edge';

const CYCLE_COLOR = new Color(255, 100, 0);

export class HoverMSTGraph {
	mstAlgorithm: PrimsMSTAlgorithm<number>;
	interactor: GraphInteractor<number>;
	addedEdge: [number, number] | undefined;
	cycle: Set<Edge<number>>;

	constructor(private animator: AnimatedGraph<number>) {
		this.mstAlgorithm = new PrimsMSTAlgorithm(animator);
		this.mstAlgorithm.initalize(0);

		while (!this.mstAlgorithm.hasTerminated()) {
			this.mstAlgorithm.step();
		}

		this.interactor = new StandardGraphInteractor(animator);
		this.addedEdge = undefined;
		this.cycle = new Set();
	}

	update(delta: number): void {
		this.animator.update(delta);

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
					this.cycle.add(new Edge(u, v));
					let p1 = u;
					let p2 = v;
					while (p1 !== p2) {
						if (this.mstAlgorithm.height.get(p1) < this.mstAlgorithm.height.get(p2)) {
							const p2Parent = this.mstAlgorithm.tree.get(p2);
							this.cycle.add(new Edge(p2Parent, p2));
							p2 = p2Parent;
						} else {
							const p1Parent = this.mstAlgorithm.tree.get(p1);
							this.cycle.add(new Edge(p1Parent, p1));
							p1 = p1Parent;
						}
					}
				}
			}
		}

		for (const vertex of this.animator.getGraph().getAllVertices()) {
			this.animator.colorVertex(vertex, new Color(240, 240, 240));
		}

		for (const edge of this.animator.getGraph().getAllEdges()) {
			this.animator.colorEdge(edge, new Color(240, 240, 240));
		}

		for (const edge of this.mstAlgorithm.tree) {
			if (edge[1] !== undefined) {
				this.animator.colorEdge(new Edge(...edge), new Color(13, 122, 255));
				this.animator.colorVertex(edge[0], new Color(13, 122, 255));
				this.animator.colorVertex(edge[1], new Color(13, 122, 255));
			}
		}

		for (const cycleEdge of this.cycle) {
			this.animator.colorEdge(cycleEdge, CYCLE_COLOR);
			this.animator.colorVertex(cycleEdge.getFrom(), CYCLE_COLOR);
			this.animator.colorVertex(cycleEdge.getTo(), CYCLE_COLOR);
		}
	}

	draw(): void {
		this.animator.draw();
	}
}
