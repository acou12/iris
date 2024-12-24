import type { GraphAnimator } from '../animator/graph-animator';
import type { Graph } from '../graph';
import type { GraphInteractor } from './graph-interactor';
import { dist, p, Point } from '$lib/graphics/point/point';
import { NODE_RADIUS } from '../animator/standard-graph-animator';

export class StandardGraphInteractor<V> implements GraphInteractor<V> {
	hoverVertex: V | undefined;
	hoverEdge: [V, V] | undefined;

	vertexHandlers: ((v: V) => void)[];
	edgeHandlers: ((e: [V, V]) => void)[];

	mousePos: Point;

	graph: Graph<V>;

	constructor(private animator: GraphAnimator<V>) {
		this.graph = animator.getGraph();
		this.setup();
	}

	private setup() {
		const canvas = this.animator.getCanvas();

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
			const vPosition = this.animator.getVertexLocation(v);
			if (dist(this.mousePos, vPosition) < NODE_RADIUS) {
				this.hoverVertex = v;
			}
		}
		this.hoverEdge = undefined;
		for (const edge of this.graph.getAllEdges()) {
			const from = edge.getFrom();
			const to = edge.getTo();

			const fromPosition = this.animator.getVertexLocation(from);
			const toPosition = this.animator.getVertexLocation(to);

			const center = fromPosition.add(toPosition).multiply(1 / 2);

			if (dist(this.mousePos, center) < 30) {
				this.hoverEdge = [from, to];
			}
		}
	}
}
