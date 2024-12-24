import type { GraphInteractor } from '$lib/graphics/graph/interactor/graph-interactor';
import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
import type { Graph } from '$lib/graphics/graph/graph';
import { Color } from '$lib/graphics/graph/color/color';
import { StandardGraphInteractor } from '$lib/graphics/graph/interactor/standard-graph-interactor';

const AMBIENT_COLOR = new Color(87, 87, 87);
const HOVER_COLOR = new Color(255, 100, 0);

export class AdjMatrix {
	graph: Graph<number>;
	interactor: GraphInteractor<number>;

	constructor(private animator: GraphAnimator<number>) {
		this.graph = animator.getGraph();
		this.interactor = new StandardGraphInteractor(animator);
	}

	update(delta: number): void {
		this.animator.update(delta);
		this.interactor.update(delta);

		const hoverVertex = this.interactor.getHoverVertex();

		for (const vertex of this.graph.getAllVertices()) {
			this.animator.colorVertex(vertex, AMBIENT_COLOR);
		}

		for (const edge of this.graph.getAllEdges()) {
			this.animator.colorEdge(edge, AMBIENT_COLOR);
		}

		if (hoverVertex !== undefined) {
			this.animator.colorVertex(hoverVertex, HOVER_COLOR);
			for (const edge of this.graph.getAdjacent(hoverVertex)) {
				this.animator.colorEdge(edge, HOVER_COLOR);
				this.animator.colorVertex(edge.getTo(), HOVER_COLOR);
			}
		}
	}

	draw(): void {
		this.animator.draw();
	}
}
