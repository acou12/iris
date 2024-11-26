<script lang="ts">
	// @hmr:reset
	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';
	import { onMount } from 'svelte';
	import { SweepLineVisualization } from './sweep-line';
	import { p } from '$lib/graphics/point/point';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);

		let sweepLine = new SweepLineVisualization(primative);

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

			sweepLine.update(delta);
			sweepLine.draw();

			requestAnimationFrame(draw);
		};

		draw(0);
	});
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
