<script lang="ts">
	import { onMount } from 'svelte';

	import type { AnimatedGraph } from '$lib/graphics/graph/animated-graph';
	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';
	import { wally } from '$lib/graphics/graph/presets';
	import { AdjMatrix } from './adj-matrix';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	let graph: AnimatedGraph<number>;
	let adjMatrixFigure: AdjMatrix;

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);
		graph = wally(primative, canvas, false);
		adjMatrixFigure = new AdjMatrix(graph);

		draw(0);
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

		adjMatrixFigure.update(delta);
		adjMatrixFigure.draw();

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
