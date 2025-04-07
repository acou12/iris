<script lang="ts">
	import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

	import { onDestroy, onMount } from 'svelte';
	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import { wally } from '$lib/graphics/graph/presets';
	import { AdjMatrix } from './adj-matrix';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	let animator: GraphAnimator<number>;
	let adjMatrixFigure: AdjMatrix;

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);
		animator = wally(primative, canvas, false);

		adjMatrixFigure = new AdjMatrix(primative, animator);

		draw(0);
	});

	onDestroy(() => {
		animator?.destroy();
		adjMatrixFigure?.destroy();
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
		width: 100%;
		height: 430px;
		margin: auto;
		display: block;
	}
</style>
