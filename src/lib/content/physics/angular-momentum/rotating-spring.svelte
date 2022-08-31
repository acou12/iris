<script lang="ts">
	import { onNavigate, withPixi } from '$lib/util/custom-lifecycle';

	let canvas: HTMLCanvasElement;

	let stop: () => void;

	withPixi(async (PIXI) => {
		const VIS = await import('$lib/util/vis');
		const app = new PIXI.Application({
			view: canvas,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0xffffff,
			width: 1100,
			height: 1100
		});

		const spring = new VIS.SpringMass(300, 100);
		spring.pixi.x = app.screen.width / 2;
		spring.pixi.y = app.screen.height / 2;

		let t = 0;

		const ticker = app.ticker.add((delta) => {
			t += delta;
			spring.extension = 200 * Math.cos(t / 45);
			spring.pixi.rotation += 0.03 / Math.pow((spring.extension + 400) / 400, 2);
		});

		stop = () => {
			app.destroy();
			ticker.stop();
		};

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
