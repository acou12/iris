<script lang="ts">
	import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';
	import type { Algorithm } from '../algorithm';

	import { onDestroy, onMount } from 'svelte';

	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import { wally } from '$lib/graphics/graph/presets';
	import { GraphSearchStepwise } from '$lib/graphics/graph/graph-search-stepwise';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	let graph: GraphAnimator<number>;

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);
		graph = wally(primative, canvas, false);

		const graphSearchStepwise = new GraphSearchStepwise(graph);

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

			graphSearchStepwise.update(delta);
			graphSearchStepwise.draw();

			requestAnimationFrame(draw);
		};

		draw(0);
	});

	onDestroy(() => {
		graph?.destroy();
	});
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		width: 75%;
		height: 420px;
		margin: auto;
		display: block;
	}
</style>
