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
			backgroundColor: 0xffffff
		});

		const eq = new PIXI.Graphics();
		eq.lineStyle({
			width: 5,
			color: 0x999999
		});
		for (let y = 0; y < app.screen.height; y += 20 * 2) {
			eq.moveTo(app.screen.width / 2, y);
			eq.lineTo(app.screen.width / 2, y + 20);
		}

		const spring1 = new VIS.SpringMass(400, 100);
		spring1.pixi.x = 0;
		spring1.pixi.y = app.screen.height / 4;

		const spring2 = new VIS.SpringMass(400, 100);
		spring2.pixi.x = 0;
		spring2.pixi.y = (app.screen.height * 2) / 4;

		const spring3 = new VIS.SpringMass(400, 100);
		spring3.pixi.x = 0;
		spring3.pixi.y = (app.screen.height * 3) / 4;

		let t = 0;

		const ticker = app.ticker.add((delta) => {
			t += delta;
			spring1.extension = 50 * Math.cos(t / 30);
			spring2.extension = 50 * Math.cos(t / 30 + 2);
			spring3.extension = 50 * Math.cos(t / 30 + 4);
		});

		app.stage.addChild(eq);
		app.stage.addChild(spring1.pixi);
		app.stage.addChild(spring2.pixi);
		app.stage.addChild(spring3.pixi);
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
