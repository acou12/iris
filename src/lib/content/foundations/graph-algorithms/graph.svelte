<script lang="ts">
	import type { AnimatedGraph } from '$lib/graphics/graph/graph';
	import { StandardAnimatedGraph } from '$lib/graphics/graph/standard-graph';
	import { p } from '$lib/graphics/point/point';
	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';
	import { onMount } from 'svelte';
	import { BreadthFirstSearcher } from './search/bfs';
	import { DepthFirstSearcher } from './search/dfs';
	import type { GraphSearcher } from './search/search';

	export let searchType: 'breadth' | 'depth';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	let graph: AnimatedGraph<number>;
	let search: GraphSearcher<number>;

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(context);
		graph = new StandardAnimatedGraph<number>(context);

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

		graph.addEdge(0, 1);
		graph.addEdge(0, 2);
		graph.addEdge(0, 3);
		graph.addEdge(1, 4);
		graph.addEdge(2, 4);
		graph.addEdge(3, 5);
		graph.addEdge(3, 8);
		graph.addEdge(4, 5);
		graph.addEdge(4, 6);
		graph.addEdge(5, 6);
		graph.addEdge(5, 7);
		graph.addEdge(5, 8);
		graph.addEdge(6, 9);
		graph.addEdge(6, 10);

		if (searchType === 'breadth') {
			search = new BreadthFirstSearcher(graph);
		} else {
			search = new DepthFirstSearcher(graph);
		}

		search.initalize(0);

		draw(0);

		canvas.addEventListener('click', (event) => {
			search.step();
		});
	});

	let lastTime = 0;

	const draw = (time: number) => {
		let delta: number;
		if (lastTime > 0) {
			delta = (time - lastTime) / 1000;
		} else {
			delta = 0;
		}
		lastTime = time;

		context.clearRect(0, 0, canvas.width, canvas.height);

		graph.update(delta);
		graph.draw();

		requestAnimationFrame(draw);
	};
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		width: 75%;
		height: 500px;
		margin: auto;
		display: block;
	}
</style>
