import type { PrimativeDrawer } from '../primative/primative';

import { Edge } from './edge';
import { p } from '../point/point';
import { StandardGraphAnimator } from './animator/standard-graph-animator';
import { StandardGraph } from './standard-graph';

export const wally = (
	primative: PrimativeDrawer,
	canvas: HTMLCanvasElement,
	weightsDisplayed: boolean
) => {
	const graph = new StandardGraph<number>();

	const vertexLocations = [
		p(121, 263),
		p(239, 68),
		p(275, 207),
		p(347, 358),
		p(417, 102),
		p(491, 241),
		p(528, 56),
		p(600, 200),
		p(636, 337),
		p(711, 60),
		p(773, 235)
	];

	for (let i = 0; i < vertexLocations.length; i++) {
		graph.addVertex(i);
	}

	graph.addEdge(new Edge(0, 1), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(0, 2), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(0, 3), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(1, 4), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(2, 4), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(3, 5), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(3, 8), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(4, 5), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(4, 6), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(5, 6), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(5, 7), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(5, 8), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(6, 9), Math.floor(Math.random() * 10) + 1);
	graph.addEdge(new Edge(6, 10), Math.floor(Math.random() * 10) + 1);

	const animator = new StandardGraphAnimator(primative, canvas, graph, weightsDisplayed);

	for (let i = 0; i < vertexLocations.length; i++) {
		animator.setVertexLocation(i, vertexLocations[i]);
	}

	return animator;
};
