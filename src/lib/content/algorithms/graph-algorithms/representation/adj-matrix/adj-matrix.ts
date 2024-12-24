import type { GraphInteractor } from '$lib/graphics/graph/interactor/graph-interactor';
import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
import type { Graph } from '$lib/graphics/graph/graph';
import type { MathRenderer } from '$lib/graphics/math/math-renderer';
import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

import { Color, lighten } from '$lib/graphics/graph/color/color';
import { StandardGraphInteractor } from '$lib/graphics/graph/interactor/standard-graph-interactor';
import { p } from '$lib/graphics/point/point';
import { KaTeXMathRenderer } from '$lib/graphics/math/katex-math-renderer';
import { Edge } from '$lib/graphics/graph/edge';

const AMBIENT_COLOR = new Color(87, 87, 87);
const HOVER_COLOR = new Color(255, 100, 0);

export class AdjMatrix {
	graph: Graph<number>;
	interactor: GraphInteractor<number>;
	hoverVertex: number | undefined;
	matrixLabels: MathRenderer<number>;

	constructor(private primative: PrimativeDrawer, private animator: GraphAnimator<number>) {
		this.graph = animator.getGraph();
		this.interactor = new StandardGraphInteractor(animator);
		this.hoverVertex = undefined;

		this.matrixLabels = new KaTeXMathRenderer(animator.getCanvas());

		for (const v1 of this.graph.getAllVertices()) {
			for (const v2 of this.graph.getAllVertices()) {
				const index = v1 * this.graph.getAllVertices().size + v2;
				this.matrixLabels.addElement(
					index,
					this.graph.hasEdge(new Edge(v1, v2)) ? `1` : `0`,
					p(900 + v1 * 30, 50 + v2 * 30),
					{
						color: this.graph.hasEdge(new Edge(v1, v2)) ? 'black' : 'gray'
					}
				);
			}
		}
	}

	update(delta: number): void {
		this.animator.update(delta);
		this.interactor.update(delta);
		this.hoverVertex = this.interactor.getHoverVertex();
	}

	draw(): void {
		for (const vertex of this.graph.getAllVertices()) {
			this.animator.colorVertex(vertex, AMBIENT_COLOR);
		}

		for (const edge of this.graph.getAllEdges()) {
			this.animator.colorEdge(edge, AMBIENT_COLOR);
		}

		for (const v1 of this.graph.getAllVertices()) {
			for (const v2 of this.graph.getAllVertices()) {
				const index = v1 * this.graph.getAllVertices().size + v2;
				const color = this.graph.hasEdge(new Edge(v1, v2)) ? 'black' : 'gray';
				this.matrixLabels.setElementStyle(index, { color });
			}
		}

		if (this.hoverVertex !== undefined) {
			for (const v2 of this.graph.getAllVertices()) {
				const color = lighten(HOVER_COLOR).toString();
				this.matrixLabels.setElementStyle(
					this.hoverVertex * this.graph.getAllVertices().size + v2,
					{ color }
				);
				this.matrixLabels.setElementStyle(
					v2 * this.graph.getAllVertices().size + this.hoverVertex,
					{ color }
				);
			}
			for (const edge of this.graph.getAdjacent(this.hoverVertex)) {
				const v2 = edge.getTo();
				const color = HOVER_COLOR.toString();
				this.matrixLabels.setElementStyle(
					this.hoverVertex * this.graph.getAllVertices().size + v2,
					{ color }
				);
				this.matrixLabels.setElementStyle(
					v2 * this.graph.getAllVertices().size + this.hoverVertex,
					{ color }
				);
			}
			this.animator.colorVertex(this.hoverVertex, HOVER_COLOR);
			for (const edge of this.graph.getAdjacent(this.hoverVertex)) {
				this.animator.colorEdge(edge, HOVER_COLOR);
				this.animator.colorVertex(edge.getTo(), HOVER_COLOR);
			}
		}

		this.animator.draw();
	}
}
