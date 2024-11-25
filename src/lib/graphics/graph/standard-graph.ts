import { Point } from '../point/point';
import { Canvas2DPrimativeDrawer } from '../primative/canvas2d-primative';
import type { PrimativeDrawer } from '../primative/primative';
import { AnimatedColor } from './color/animated-color';
import { Color, lighten } from './color/color';
import type { AnimatedGraph } from './graph';

export class StandardAnimatedGraph<V> implements AnimatedGraph<V> {
	private vertexSet: Set<V>;
	private adjMap: Map<V, { adj: V; color: AnimatedColor }[]>;
	private locationMap: Map<V, Point>;
	private vertexColorMap: Map<V, AnimatedColor>;
	private animating: boolean;

	private primative: PrimativeDrawer;

	constructor(context: CanvasRenderingContext2D) {
		this.vertexSet = new Set();
		this.adjMap = new Map();
		this.locationMap = new Map();
		this.vertexColorMap = new Map();
		this.animating = false;
		this.primative = new Canvas2DPrimativeDrawer(context);
	}

	addVertex(v: V, location: Point): void {
		this.vertexSet.add(v);
		this.adjMap.set(v, []);
		this.vertexColorMap.set(v, new AnimatedColor(new Color(0, 0, 0)));
		this.locationMap.set(v, location);
	}

	addEdge(v1: V, v2: V): void {
		this.adjMap.get(v1).push({ adj: v2, color: new AnimatedColor(new Color(0, 0, 0)) });
		this.adjMap.get(v2).push({ adj: v1, color: new AnimatedColor(new Color(0, 0, 0)) });
	}

	getAdjacent(v: V): [V, V][] {
		return this.adjMap.get(v).map((adj) => [v, adj.adj]);
	}

	startAnimating(): void {
		this.animating = true;
	}

	stopAnimating(): void {
		this.animating = false;
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
		for (const [v, adj] of this.adjMap.entries()) {
			for (const u of adj) {
				u.color.update(delta);
				if (v === 0) {
					console.log(u.color);
				}
			}
		}

		for (const v of this.vertexSet) {
			this.vertexColorMap.get(v).update(delta);
		}
	}

	draw(): void {
		for (const [v, adj] of this.adjMap.entries()) {
			for (const u of adj) {
				this.primative.drawLine(this.locationMap.get(u.adj), this.locationMap.get(v), {
					stroke: lighten(u.color.getAnimatedColor()).toString(),
					strokeWidth: 10
				});
			}
		}

		for (const v of this.vertexSet) {
			this.primative.drawCircle(this.locationMap.get(v), 20, {
				fill: this.vertexColorMap.get(v).getAnimatedColor().toString(),
				stroke: lighten(this.vertexColorMap.get(v).getAnimatedColor()).toString(),
				strokeWidth: 5
			});
		}
	}
}
