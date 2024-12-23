import type { GraphInteractor } from '$lib/graphics/graph/interactor/graph-interactor';
import type { AnimatedGraph } from '$lib/graphics/graph/animated-graph';
import { Color } from '$lib/graphics/graph/color/color';
import { StandardGraphInteractor } from '$lib/graphics/graph/interactor/standard-graph-interactor';

const AMBIENT_COLOR = new Color(87, 87, 87);
const HOVER_COLOR = new Color(255, 100, 0);

export class AdjMatrix {
	interactor: GraphInteractor<number>;

	constructor(private graph: AnimatedGraph<number>) {
		this.interactor = new StandardGraphInteractor(graph);
	}

	update(delta: number): void {
		this.graph.update(delta);

		this.interactor.update(delta);

		const hoverVertex = this.interactor.getHoverVertex();

		for (const [u, v, _w] of this.graph.getAllEdges()) {
			this.graph.colorEdge([u, v], AMBIENT_COLOR);
			this.graph.colorVertex(u, AMBIENT_COLOR);
			this.graph.colorVertex(v, AMBIENT_COLOR);
		}

		if (hoverVertex !== undefined) {
			this.graph.colorVertex(hoverVertex, HOVER_COLOR);
			for (const [u, v, _w] of this.graph.getAdjacent(hoverVertex)) {
				this.graph.colorEdge([u, v], HOVER_COLOR);
				this.graph.colorVertex(v, HOVER_COLOR);
			}
		}
	}

	draw(): void {
		this.graph.draw();
	}
}
