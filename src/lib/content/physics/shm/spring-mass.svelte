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

		const mass = new PIXI.Graphics();
		mass.beginFill(0);
		mass.drawRect(0, 0, 100, 100);
		mass.endFill();
		mass.pivot.x = mass.width / 2;
		mass.pivot.y = mass.height / 2;
		mass.y = app.screen.height / 2;
		mass.x = app.screen.width / 2;

		const spring = new PIXI.Graphics();
		spring.lineStyle({
			width: 5,
			color: 0x999999
		});
		spring.moveTo(0, Math.cos(2) * 50);
		for (let x = 0; x < 500; x++) {
			spring.lineTo(x, Math.cos(x / 10 + 2) * 50);
		}
		spring.y = app.screen.height / 2;
		spring.scale.x = (mass.x - mass.width / 2 + 1) / 500;

		const eq = new PIXI.Graphics();
		eq.lineStyle({
			width: 5,
			color: 0x999999
		});
		for (let y = 0; y < app.screen.height; y += 20 * 2) {
			eq.moveTo(app.screen.width / 2, y);
			eq.lineTo(app.screen.width / 2, y + 20);
		}

		const path = new PIXI.Graphics();
		path.lineStyle({
			width: 10,
			color: 0x0000ff
		});
		path.moveTo(mass.x, mass.y);

		let massV = 5;
		const k = 0.001;
		const ticker = app.ticker.add((delta) => {
			massV -= (mass.x - app.screen.width / 2) * k * delta;
			mass.x += massV * delta;
			spring.scale.x = (mass.x - mass.width / 2 + 1) / 500;
		});

		app.stage.addChild(eq);
		app.stage.addChild(spring);
		app.stage.addChild(mass);
		app.stage.addChild(path);
	});
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		margin: auto;
		display: block;
	}
</style>
