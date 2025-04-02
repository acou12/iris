import type { GraphAnimator } from './animator/graph-animator';
import type { GraphInteractor } from './interactor/graph-interactor';

import { Color } from './color/color';
import { StandardGraphInteractor } from './interactor/standard-graph-interactor';
import { Edge } from './edge';

export class GraphSearchStepwise {
	interactor: GraphInteractor<number>;
	treeVertices: Set<number>;
	treeEdges: Set<Edge<number>>;

	constructor(private animator: GraphAnimator<number>) {
		this.interactor = new StandardGraphInteractor(animator);

		this.interactor.handleClickEdge((e) => {
			const [from, to] = e;
			if (this.treeVertices.has(from) && !this.treeVertices.has(to)) {
				this.treeVertices.add(to);
				this.treeEdges.add(new Edge(from, to));
			} else if (this.treeVertices.has(to) && !this.treeVertices.has(from)) {
				this.treeEdges.add(new Edge(to, from));
				this.treeVertices.add(from);
			}
		});

		this.treeVertices = new Set();
		this.treeVertices.add(0);
		this.treeEdges = new Set();
	}

	update(delta: number): void {
		this.animator.update(delta);

		this.interactor.update(delta);

		// const fringeEdges = new Set();
		// const fringeVertices = new Set();

		for (const vertex of this.animator.getGraph().getAllVertices()) {
			this.animator.colorVertex(vertex, new Color(240, 240, 240));
		}

		for (const edge of this.animator.getGraph().getAllEdges()) {
			this.animator.colorEdge(edge, new Color(240, 240, 240));
		}

		const TREE_COLOR = new Color(13, 122, 255);

		for (const vertex of this.treeVertices) {
			this.animator.colorVertex(vertex, TREE_COLOR);
		}

		for (const edge of this.treeEdges) {
			this.animator.colorEdge(edge, TREE_COLOR);
		}

		for (const vertex of this.treeVertices) {
			const FRINGE_COLOR = new Color(255, 150, 100);
			const HOVER_FRINGE_COLOR = new Color(255, 100, 0);
			for (const edge of this.animator.getGraph().getAdjacent(vertex)) {
				const hoverEdge = this.interactor.getHoverEdge();
				if (!this.treeVertices.has(edge.getFrom())) {
					this.animator.colorEdge(edge, FRINGE_COLOR);
					this.animator.colorVertex(edge.getFrom(), FRINGE_COLOR);
					if (hoverEdge !== undefined && new Edge(...hoverEdge).identical(edge)) {
						this.animator.colorEdge(edge, HOVER_FRINGE_COLOR);
						this.animator.colorVertex(edge.getFrom(), HOVER_FRINGE_COLOR);
					}
				} else if (!this.treeVertices.has(edge.getTo())) {
					this.animator.colorEdge(edge, FRINGE_COLOR);
					this.animator.colorVertex(edge.getTo(), FRINGE_COLOR);
					if (hoverEdge !== undefined && new Edge(...hoverEdge).identical(edge)) {
						this.animator.colorEdge(edge, HOVER_FRINGE_COLOR);
						this.animator.colorVertex(edge.getTo(), HOVER_FRINGE_COLOR);
					}
				}
			}
		}
	}

	draw(): void {
		this.animator.draw();
	}
}
