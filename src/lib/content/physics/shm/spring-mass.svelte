<script lang="ts">
	import { onNavigate, withPixi } from '$lib/util/custom-lifecycle';

	let canvas: HTMLCanvasElement;

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

		const spring = new VIS.SpringMass(400, 100);
		spring.pixi.x = 0;
		spring.pixi.y = app.screen.height / 2;

		let t = 0;

		const ticker = app.ticker.add((delta) => {
			t += delta;
			spring.extension = 150 * Math.cos(t / 30);
		});

		app.stage.addChild(eq);
		app.stage.addChild(spring.pixi);
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
