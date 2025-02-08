import { MathAlign, type MathRenderer } from '../../math/math-renderer';
import type { PrimativeDrawer } from '../../primative/primative';
import type { GraphAnimator } from './graph-animator';
import type { Graph } from '../graph';

import { KaTeXMathRenderer } from '../../math/katex-math-renderer';
import { p, Point } from '../../point/point';
import { AnimatedColor } from '../color/animated-color';
import { Color, lighten } from '../color/color';
import { UndirectedEdgeMap } from '../edge-map';
import { Edge } from '../edge';

export const NODE_RADIUS = 30;

export class StandardGraphAnimator<V> implements GraphAnimator<V> {
	private locationMap: Map<V, Point>;
	private edgeColorMap: UndirectedEdgeMap<V, AnimatedColor>;
	private vertexColorMap: Map<V, AnimatedColor>;
	private vertexLabelRenderer: MathRenderer<V>;

	constructor(
		private primative: PrimativeDrawer,
		private canvas: HTMLCanvasElement,
		private graph: Graph<V>,
		private showWeights: boolean = true
	) {
		this.locationMap = new Map();
		this.edgeColorMap = new UndirectedEdgeMap();
		this.vertexColorMap = new Map();
		this.vertexLabelRenderer = new KaTeXMathRenderer(canvas);
		for (const v of graph.getAllVertices()) {
			this.vertexColorMap.set(v, new AnimatedColor(new Color(0, 0, 0)));
			this.vertexLabelRenderer.addElement(
				v,
				`v_{${v}}`,
				p(0, 0),
				{ color: 'white' },
				MathAlign.CENTER
			);
		}
		for (const e of graph.getAllEdges()) {
			this.edgeColorMap.set(e, new AnimatedColor(new Color(0, 0, 0)));
		}
	}

	colorVertex(v: V, color: Color): void {
		this.vertexColorMap.get(v).animateTo(color);
	}

	colorEdge(e: Edge<V>, color: Color): void {
		this.edgeColorMap.get(e).animateTo(color);
	}

	getVertexLocation(v: V): Point {
		return this.locationMap.get(v);
	}

	setVertexLocation(v: V, p: Point): void {
		this.locationMap.set(v, p);
		this.vertexLabelRenderer.moveElement(v, p);
	}

	update(delta: number): void {
		for (const edge of this.graph.getAllEdges()) {
			this.edgeColorMap.get(edge).update(delta);
		}

		for (const v of this.graph.getAllVertices()) {
			this.vertexColorMap.get(v).update(delta);
		}

		this.vertexLabelRenderer.update(delta);
	}

	draw(): void {
		for (const edge of this.graph.getAllEdges()) {
			const u = edge.getFrom();
			const v = edge.getTo();

			const edgeColor = this.edgeColorMap.get(edge);
			const edgeWeight = this.graph.getWeight(edge);

			const uLocation = this.locationMap.get(u);
			const vLocation = this.locationMap.get(v);

			this.primative.drawLine(uLocation, vLocation, {
				stroke: lighten(edgeColor.getAnimatedColor()).toString(),
				strokeWidth: 10
			});

			if (this.showWeights) {
				const center = uLocation.add(vLocation).multiply(1 / 2);

				const diff = vLocation.add(uLocation.multiply(-1));

				let offset = p(diff.y, -diff.x);
				offset = offset.multiply((1 / offset.length()) * 20);

				if (offset.y > 0) {
					offset = offset.multiply(-1);
				}

				this.primative.drawText(edgeWeight.toString(), center.add(offset), {
					fill: '#555',
					stroke: '#555',
					strokeWidth: 0.001
				});
			}
		}

		for (const v of this.graph.getAllVertices()) {
			this.primative.drawCircle(this.locationMap.get(v), NODE_RADIUS, {
				fill: this.vertexColorMap.get(v).getAnimatedColor().toString(),
				stroke: lighten(this.vertexColorMap.get(v).getAnimatedColor()).toString(),
				strokeWidth: 5
			});
		}
	}

	getGraph(): Graph<V> {
		return this.graph;
	}

	getCanvas(): HTMLCanvasElement {
		return this.canvas;
	}

	destroy(): void {
		this.vertexLabelRenderer.destroy();
	}
}
