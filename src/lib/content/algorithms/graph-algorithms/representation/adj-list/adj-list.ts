import type { GraphInteractor } from '$lib/graphics/graph/interactor/graph-interactor';
import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
import type { Graph } from '$lib/graphics/graph/graph';
import { MathAlign, type MathRenderer } from '$lib/graphics/math/math-renderer';
import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

import { Color } from '$lib/graphics/graph/color/color';
import { StandardGraphInteractor } from '$lib/graphics/graph/interactor/standard-graph-interactor';
import { p } from '$lib/graphics/point/point';
import { KaTeXMathRenderer } from '$lib/graphics/math/katex-math-renderer';

const AMBIENT_COLOR = new Color(87, 87, 87);
const HOVER_COLOR = new Color(255, 100, 0);

export class AdjList {
	graph: Graph<number>;
	interactor: GraphInteractor<number>;
	hoverVertex: number | undefined;
	listLabels: MathRenderer<number>;

	constructor(private primative: PrimativeDrawer, private animator: GraphAnimator<number>) {
		this.graph = animator.getGraph();
		this.interactor = new StandardGraphInteractor(animator);
		this.hoverVertex = undefined;

		this.listLabels = new KaTeXMathRenderer(animator.getCanvas());

		for (const v1 of this.graph.getAllVertices()) {
			const list = `\\langle ${this.graph
				.getAdjacent(v1)
				.map((adj) => `v_{${adj.getTo()}}`)
				.join(', ')} \\rangle`;
			const index = v1;
			this.listLabels.addElement(
				index,
				`v_{${v1}} \\to ${list}`,
				p(900, 25 + v1 * 35),
				{
					color: 'black'
				},
				MathAlign.LEFT
			);
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
			const index = v1;
			this.listLabels.setElementStyle(index, {
				color: 'black'
			});
		}

		if (this.hoverVertex !== undefined) {
			const color = HOVER_COLOR.toString();
			this.listLabels.setElementStyle(this.hoverVertex, {
				color
			});
			this.animator.colorVertex(this.hoverVertex, HOVER_COLOR);
			for (const edge of this.graph.getAdjacent(this.hoverVertex)) {
				this.animator.colorEdge(edge, HOVER_COLOR);
				this.animator.colorVertex(edge.getTo(), HOVER_COLOR);
			}
		}

		this.animator.draw();
	}

	destroy(): void {
		this.listLabels.destroy();
	}
}
