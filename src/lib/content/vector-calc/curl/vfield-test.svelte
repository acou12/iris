<script lang="ts">
	// @hmr:reset
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	import { withPixi } from '$lib/util/custom-lifecycle';

	withPixi(async (PIXI) => {
		const VIS = await import('$lib/util/vis');
		const app = new PIXI.Application({
			view: canvas,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0xffffff,
			width: 800,
			height: 800
		});

		const field = new VIS.VectorField((v) => v);
		field.pixi.x = app.screen.width / 2;
		field.pixi.y = app.screen.height / 2;

		const ticker = app.ticker.add((delta) => {});

		app.stage.addChild(field.pixi);
		return [app, ticker];
	});
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		margin: auto;
		display: block;
	}
</style>
