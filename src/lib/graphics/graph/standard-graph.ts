import type { MathRenderer } from '../math/math-renderer';
import type { PrimativeDrawer } from '../primative/primative';
import type { AnimatedGraph } from './graph';

import { KaTeXMathRenderer } from '../math/katex-math-renderer';
import { p, Point } from '../point/point';
import { AnimatedColor } from './color/animated-color';
import { Color, lighten } from './color/color';

export const NODE_RADIUS = 30;

export class StandardAnimatedGraph<V> implements AnimatedGraph<V> {
	private vertexSet: Set<V>;
	private adjMap: Map<V, { adj: V; weight: number; color: AnimatedColor }[]>;
	private locationMap: Map<V, Point>;
	private vertexColorMap: Map<V, AnimatedColor>;
	private vertexLabelRenderer: MathRenderer<V>;

	constructor(
		private primative: PrimativeDrawer,
		private canvas: HTMLCanvasElement,
		private showWeights: boolean = true
	) {
		this.vertexSet = new Set();
		this.adjMap = new Map();
		this.locationMap = new Map();
		this.vertexColorMap = new Map();
		this.vertexLabelRenderer = new KaTeXMathRenderer(canvas);
	}

	getAllVertices(): Set<V> {
		return this.vertexSet;
	}

	getAllEdges(): [V, V, number][] {
		const used = new Set();
		const result: [V, V, number][] = [];
		for (const v of this.vertexSet) {
			result.push(...this.getAdjacent(v).filter(([_from, to, _weight]) => !used.has(to)));
			used.add(v);
		}
		return result;
	}

	getWeight(e: [V, V]): number {
		return this.adjMap.get(e[0]).find((edge) => edge.adj === e[1])!.weight;
	}

	setWeight(e: [V, V], weight: number): void {
		this.adjMap.get(e[0]).find((edge) => edge.adj === e[1])!.weight = weight;
	}

	addVertex(v: V, location: Point): void {
		this.vertexSet.add(v);
		this.adjMap.set(v, []);
		this.vertexColorMap.set(v, new AnimatedColor(new Color(0, 0, 0)));
		this.vertexLabelRenderer.addElement(v, `v_{${v}}`, location);
		this.locationMap.set(v, location);
	}

	addEdge(v1: V, v2: V, weight: number): void {
		this.adjMap.get(v1).push({ adj: v2, weight, color: new AnimatedColor(new Color(0, 0, 0)) });
		this.adjMap.get(v2).push({ adj: v1, weight, color: new AnimatedColor(new Color(0, 0, 0)) });
	}

	getAdjacent(v: V): [V, V, number][] {
		return this.adjMap.get(v).map((edge) => [v, edge.adj, edge.weight]);
	}

	colorEdge(e: [V, V], color: Color): void {
		this.adjMap
			.get(e[0])
			.find((adj) => adj.adj == e[1])!
			.color.animateTo(color);
		this.adjMap
			.get(e[1])
			.find((adj) => adj.adj == e[0])!
			.color.animateTo(color);
	}

	colorVertex(v: V, color: Color): void {
		this.vertexColorMap.get(v).animateTo(color);
	}

	getVertexLocation(v: V): Point {
		return this.locationMap.get(v);
	}

	setVertexLocation(v: V, p: Point): void {
		this.locationMap.set(v, p);
	}

	update(delta: number): void {
		for (const [_v, adj] of this.adjMap.entries()) {
			for (const u of adj) {
				u.color.update(delta);
			}
		}

		for (const v of this.vertexSet) {
			this.vertexColorMap.get(v).update(delta);
		}
	}

	draw(): void {
		for (const [u, adj] of this.adjMap.entries()) {
			for (const { adj: v, color, weight } of adj) {
				const uLocation = this.locationMap.get(u);
				const vLocation = this.locationMap.get(v);

				this.primative.drawLine(uLocation, vLocation, {
					stroke: lighten(color.getAnimatedColor()).toString(),
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

					this.primative.drawText(weight.toString(), center.add(offset), {
						fill: '#555',
						stroke: '#555',
						strokeWidth: 0.001
					});
				}
			}
		}

		for (const v of this.vertexSet) {
			this.primative.drawCircle(this.locationMap.get(v), NODE_RADIUS, {
				fill: this.vertexColorMap.get(v).getAnimatedColor().toString(),
				stroke: lighten(this.vertexColorMap.get(v).getAnimatedColor()).toString(),
				strokeWidth: 5
			});
		}
	}

	getCanvas(): HTMLCanvasElement {
		return this.canvas;
	}
}
