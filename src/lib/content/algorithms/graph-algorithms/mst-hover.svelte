<script lang="ts">
	import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';
	import type { Algorithm } from './algorithm';

	import { onMount } from 'svelte';

	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import { HoverMSTGraph } from '$lib/graphics/graph/hover-mst-graph';
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

		const hoverGraph = new HoverMSTGraph(graph);

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

			hoverGraph.update(delta);
			hoverGraph.draw();

			requestAnimationFrame(draw);
		};

		draw(0);

		canvas.addEventListener('click', (event) => {
			algorithm.step();
		});
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
