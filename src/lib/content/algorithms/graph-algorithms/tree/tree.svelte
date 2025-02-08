<script lang="ts">
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

	import { onDestroy, onMount } from 'svelte';
	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);

		draw(0);
	});

	onDestroy(() => {});

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

		requestAnimationFrame(draw);
	};
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		width: 100%;
		height: 430px;
		margin: auto;
		display: block;
	}
</style>
