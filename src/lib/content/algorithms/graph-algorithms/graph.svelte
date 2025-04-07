<script lang="ts">
	import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';
	import type { Algorithm } from '../algorithm';

	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import { onDestroy, onMount } from 'svelte';
	import { FringeSearch } from './search/fringe';
	import { wally } from '$lib/graphics/graph/presets';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	let graph: GraphAnimator<number>;
	let algorithm: Algorithm<number>;

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);
		graph = wally(primative, canvas, false);

		algorithm = new FringeSearch(graph);

		algorithm.initalize(0);

		draw(0);

		canvas.addEventListener('click', (event) => {
			if (!algorithm.hasTerminated()) {
				algorithm.step();
			}
		});
	});

	onDestroy(() => {
		graph?.destroy();
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
