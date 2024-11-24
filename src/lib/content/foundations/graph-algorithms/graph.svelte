<script lang="ts">
	import { AnimatedGraph } from '$lib/graphics/graph/graph';
	import { p } from '$lib/graphics/point/point';
	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';
	import { onMount } from 'svelte';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	// let graph: AnimatedGraph<number>;

	onMount(() => {
		context = canvas.getContext('2d');

		primative = new Canvas2DPrimativeDrawer(context);

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		draw(0);
	});

	let x = 0;
	let y = 0;
	let vx = 1;
	let vy = 1;

	const draw = (time: number) => {
		x += vx;
		y += vy;

		if (x + 100 > canvas.width) {
			x = canvas.width - 100;
			vx *= -1;
		} else if (x < 0) {
			x = 0;
			vx *= -1;
		}

		if (y + 100 > canvas.height) {
			y = canvas.height - 100;
			vy *= -1;
		} else if (y < 0) {
			y = 0;
			vy *= -1;
		}

		context.clearRect(0, 0, canvas.width, canvas.height);

		requestAnimationFrame(draw);
	};
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		width: 75%;
		height: 300px;
		margin: auto;
		display: block;
	}
</style>
