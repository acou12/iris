<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(async () => {
		const PIXI = await import('pixi.js');
		const app = new PIXI.Application({
			view: canvas,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0xffffff
		});

		const LENGTH = 200;
		const pendulum = new PIXI.Graphics();
		pendulum.lineStyle({
			width: 5
		});
		pendulum.lineTo(0, LENGTH);
		pendulum.beginFill(0);
		pendulum.drawCircle(0, LENGTH, 15);
		pendulum.endFill();
		pendulum.x = app.screen.width / 2;
		pendulum.y = app.screen.height / 3;

		let omega = 0.02;

		const ticker = app.ticker.add((delta) => {
			omega -= Math.sin(pendulum.rotation) * 0.001;
			pendulum.rotation += omega;
		});

		app.stage.addChild(pendulum);
	});
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		margin: auto;
		display: block;
	}
</style>
