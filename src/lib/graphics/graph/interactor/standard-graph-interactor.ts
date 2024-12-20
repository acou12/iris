import { dist, p, Point } from '$lib/graphics/point/point';
import type { AnimatedGraph } from '../animated-graph';
import { NODE_RADIUS } from '../standard-animated-graph';
import type { GraphInteractor } from './graph-interactor';

export class StandardGraphInteractor<V> implements GraphInteractor<V> {
	hoverVertex: V | undefined;
	hoverEdge: [V, V] | undefined;

	vertexHandlers: ((v: V) => void)[];
	edgeHandlers: ((e: [V, V]) => void)[];

	mousePos: Point;

	constructor(private graph: AnimatedGraph<V>) {
		this.setup();
	}

	private setup() {
		const canvas = this.graph.getCanvas();

		this.mousePos = p(0, 0);

		canvas.addEventListener('mousemove', (e) => {
			this.mousePos = p(e.offsetX, e.offsetY);
		});

		canvas.addEventListener('mouseclick', () => {
			if (this.hoverVertex !== undefined) {
				this.vertexHandlers.forEach((handle) => handle(this.hoverVertex));
			}
			if (this.hoverEdge !== undefined) {
				this.edgeHandlers.forEach((handle) => handle(this.hoverEdge));
			}
		});
	}

	getHoverVertex(): V | undefined {
		return this.hoverVertex;
	}

	getHoverEdge(): [V, V] | undefined {
		return this.hoverEdge;
	}

	handleClickVertex(handle: (v: V) => void): void {
		this.vertexHandlers.push(handle);
	}

	handleClickEdge(handle: (e: [V, V]) => void): void {
		this.edgeHandlers.push(handle);
	}

	update(_delta: number): void {
		this.hoverVertex = undefined;
		for (const v of this.graph.getAllVertices()) {
			const vPosition = this.graph.getVertexLocation(v);
			if (dist(this.mousePos, vPosition) < NODE_RADIUS) {
				this.hoverVertex = v;
			}
		}
		this.hoverEdge = undefined;
		for (const [from, to] of this.graph.getAllEdges()) {
			const fromPosition = this.graph.getVertexLocation(from);
			const toPosition = this.graph.getVertexLocation(to);

			const center = fromPosition.add(toPosition).multiply(1 / 2);

			if (dist(this.mousePos, center) < 30) {
				this.hoverEdge = [from, to];
			}
		}
	}
}
