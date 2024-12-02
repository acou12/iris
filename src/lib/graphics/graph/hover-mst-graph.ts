import { PrimsMSTAlgorithm } from '$lib/content/foundations/graph-algorithms/weighted/prims';
import { p, Point } from '../point/point';
import { Color } from './color/color';
import type { AnimatedGraph } from './graph';

export class HoverMSTGraph {
	mousePos: Point;
	mstAlgorithm: PrimsMSTAlgorithm<number>;

	constructor(private graph: AnimatedGraph<number>) {
		this.mstAlgorithm = new PrimsMSTAlgorithm(graph);
		this.mstAlgorithm.initalize(0);
		while (!this.mstAlgorithm.hasTerminated()) {
			this.mstAlgorithm.step();
		}

		this.mousePos = p(0, 0);

		document.addEventListener('mousemove', (e) => {
			this.mousePos = p(e.offsetX, e.offsetY);
		});
	}

	update(delta: number): void {
		this.graph.update(delta);
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
		for (const [u, v, _w] of this.graph.getAllEdges()) {
			let center = this.graph
				.getVertexLocation(u)
				.add(this.graph.getVertexLocation(v))
				.multiply(1 / 2);
			if (this.mousePos.add(center.multiply(-1)).length() < 30) {
				if (this.mstAlgorithm.tree.get(u) !== v && this.mstAlgorithm.tree.get(v) !== u) {
					let cycleColor = new Color(255, 100, 0);
					this.graph.colorEdge([u, v], cycleColor);
					let p1 = u;
					let p2 = v;
					while (p1 !== p2) {
						this.graph.colorVertex(p1, cycleColor);
						this.graph.colorVertex(p2, cycleColor);
						if (this.mstAlgorithm.height.get(p1) < this.mstAlgorithm.height.get(p2)) {
							this.graph.colorEdge([this.mstAlgorithm.tree.get(p2), p2], cycleColor);
							p2 = this.mstAlgorithm.tree.get(p2);
						} else {
							this.graph.colorEdge([this.mstAlgorithm.tree.get(p1), p1], cycleColor);
							p1 = this.mstAlgorithm.tree.get(p1);
						}
					}
					break;
				}
			}
		}
	}

	draw(): void {
		this.graph.draw();
	}
}
