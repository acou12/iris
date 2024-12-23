import { p } from '../point/point';
import type { PrimativeDrawer } from '../primative/primative';
import { StandardAnimatedGraph } from './standard-animated-graph';

export const wally = (
	primative: PrimativeDrawer,
	canvas: HTMLCanvasElement,
	weightsDisplayed: boolean
) => {
	const graph = new StandardAnimatedGraph<number>(primative, canvas, weightsDisplayed);

	const test = [
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

	for (let i = 0; i < test.length; i++) {
		graph.addVertex(i, test[i]);
	}

	graph.addEdge(0, 1, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(0, 2, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(0, 3, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(1, 4, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(2, 4, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(3, 5, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(3, 8, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(4, 5, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(4, 6, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(5, 6, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(5, 7, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(5, 8, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(6, 9, Math.floor(Math.random() * 10) + 1);
	graph.addEdge(6, 10, Math.floor(Math.random() * 10) + 1);

	return graph;
};
