<script lang="ts">
	import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

	import { onDestroy, onMount } from 'svelte';
	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import { wally } from '$lib/graphics/graph/presets';
	import { Definitions } from './definitions';
	import type { GraphInteractor } from '$lib/graphics/graph/interactor/graph-interactor';
	import { StandardGraphInteractor } from '$lib/graphics/graph/interactor/standard-graph-interactor';
	import katex from 'katex';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	let animator: GraphAnimator<number>;
	let interactor: GraphInteractor<number>;
	let figure: Definitions;

	let text: string = '';

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);
		animator = wally(primative, canvas, false);
		interactor = new StandardGraphInteractor(animator);

		figure = new Definitions(primative, animator);

		draw(0);
	});

	onDestroy(() => {
		animator?.destroy();
		figure?.destroy();
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

		figure.update(delta);
		figure.draw();

		interactor.update(delta);

		if (interactor.getHoverVertex() !== undefined) {
			let newText = ``;
			for (const n of animator.getGraph().getAdjacent(interactor.getHoverVertex())) {
				newText += `<div style="color: orange;">${math(
					`v_{${interactor.getHoverVertex()}}`
				)} is <strong>adjacent</strong> to ${math(`v_{${n.getTo()}}`)}</div>`;
			}
			text = newText;
		} else if (interactor.getHoverEdge() !== undefined) {
			let newText = `<div style="color: rgb(162, 70, 212);">${math(
				`(v_{${interactor.getHoverEdge()[0]}}, v_{${interactor.getHoverEdge()[1]}})`
			)} is <strong>incident</strong> on ${math(`v_{${interactor.getHoverEdge()[0]}}`)}</div>`;
			newText += `<div style="color: rgb(162, 70, 212);">${math(
				`(v_{${interactor.getHoverEdge()[0]}}, v_{${interactor.getHoverEdge()[1]}})`
			)} is <strong>incident</strong> on ${math(`v_{${interactor.getHoverEdge()[1]}}`)}</div>`;
			text = newText;
		} else {
			console.log('nada');
			text = ``;
		}

		requestAnimationFrame(draw);
	};

	const math = (s: string) => {
		return katex.renderToString(s);
	};
</script>

<div class="wrapper">
	<canvas bind:this={canvas} />
	<p>{@html text}</p>
</div>

<style lang="scss">
	canvas {
		height: 430px;
		display: block;
	}

	p {
		min-width: 250px;
	}

	.wrapper {
		display: flex;
		margin: auto;
	}
</style>
