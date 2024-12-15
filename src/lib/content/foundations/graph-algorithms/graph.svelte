<script lang="ts">
	import type { AnimatedGraph } from '$lib/graphics/graph/graph';
	import { StandardAnimatedGraph } from '$lib/graphics/graph/standard-graph';
	import { p } from '$lib/graphics/point/point';
	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';
	import { onMount } from 'svelte';
	import { BreadthFirstSearcher } from './search/bfs';
	import { DepthFirstSearcher } from './search/dfs';
	import type { Algorithm } from './algorithm';
	import { DijstrasShortestPathAlgorithm } from './weighted/dijkstras';
	import { PrimsMSTAlgorithm } from './weighted/prims';
	import { BottleneckMaxSTAlgorithm } from './weighted/bottleneck';
	import { wally } from '$lib/graphics/graph/presets';

	export let searchType: 'breadth' | 'depth' | 'shortest' | 'mst' | 'maxst';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	let graph: AnimatedGraph<number>;
	let algorithm: Algorithm<number>;

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);
		graph = wally(primative, canvas, !(searchType == 'breadth' || searchType == 'depth'));

		if (searchType === 'breadth') {
			algorithm = new BreadthFirstSearcher(graph);
		} else if (searchType === 'depth') {
			algorithm = new DepthFirstSearcher(graph);
		} else if (searchType === 'shortest') {
			algorithm = new DijstrasShortestPathAlgorithm(graph);
		} else if (searchType === 'mst') {
			algorithm = new PrimsMSTAlgorithm(graph);
		} else if (searchType === 'maxst') {
			algorithm = new BottleneckMaxSTAlgorithm(graph);
		}

		algorithm.initalize(0);

		draw(0);

		canvas.addEventListener('click', (event) => {
			algorithm.step();
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
