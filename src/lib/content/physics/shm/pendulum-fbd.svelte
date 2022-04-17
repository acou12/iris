<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(async () => {
		// todo: abstract
		const PIXI = await import('pixi.js');
		const app = new PIXI.Application({
			view: canvas,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0xffffff
		});

		const LENGTH = 150;
		const line = new PIXI.Graphics();
		const bob = new PIXI.Graphics();
		line.lineStyle({
			width: 5
		});
		line.lineTo(0, LENGTH);
		bob.beginFill(0);
		bob.drawCircle(0, LENGTH, 15);
		bob.endFill();
		line.x = app.screen.width / 2;
		line.y = app.screen.height / 3;
		bob.x = app.screen.width / 2;
		bob.y = app.screen.height / 3;

		let pressing = false;

		const arrow = (len: number) => {
			const arrow = new PIXI.Graphics();
			arrow.lineStyle({
				width: 5,
				color: 0xffffff,
				cap: PIXI.LINE_CAP.ROUND,
				join: PIXI.LINE_JOIN.ROUND
			});
			arrow.lineTo(len, 0);
			arrow.lineTo(len - 10, 10);
			arrow.moveTo(len, 0);
			arrow.lineTo(len - 10, -10);
			return arrow;
		};

		const f_g = arrow(100);
		f_g.tint = 0x34ebab;
		f_g.rotation = Math.PI / 2;

		const f_c = arrow(100);
		f_c.tint = 0xeba834;

		const f_t = arrow(100);
		f_t.tint = 0x3489eb;

		let omega = 0.025;

		app.ticker.add((delta) => {
			omega -= Math.sin(bob.rotation) * 0.0002;
			line.rotation += omega;
			bob.rotation += omega;
			if (pressing) {
				const theta =
					Math.atan2(mousePos.y - app.screen.height / 3, mousePos.x - app.screen.width / 2) -
					Math.PI / 2;
				line.rotation = theta;
				bob.rotation = theta;
				omega = 0;
			}
			f_g.x = line.x + Math.cos(line.rotation + Math.PI / 2) * LENGTH;
			f_g.y = line.y + Math.sin(line.rotation + Math.PI / 2) * LENGTH;

			f_c.x = line.x + Math.cos(line.rotation + Math.PI / 2) * LENGTH;
			f_c.y = line.y + Math.sin(line.rotation + Math.PI / 2) * LENGTH;
			f_c.scale.x = Math.sin(line.rotation);
			f_c.scale.y = Math.sin(line.rotation);
			f_c.rotation = line.rotation;

			f_t.x = line.x + Math.cos(line.rotation + Math.PI / 2) * LENGTH;
			f_t.y = line.y + Math.sin(line.rotation + Math.PI / 2) * LENGTH;
			f_t.scale.x = Math.cos(line.rotation);
			f_t.scale.y = Math.cos(line.rotation);
			f_t.rotation = line.rotation - Math.PI / 2;
		});

		app.stage.addChild(line);
		app.stage.addChild(f_g);
		app.stage.addChild(f_c);
		app.stage.addChild(f_t);
		app.stage.addChild(bob);

		let mousePos: { x: number; y: number } = {
			x: 0,
			y: 0
		};

		canvas.addEventListener('mousedown', (event) => {
			pressing = true;
			console.log(mousePos);
		});

		canvas.addEventListener('mouseup', (event) => {
			pressing = false;
		});

		canvas.addEventListener('mousemove', (event) => {
			mousePos.x = event.offsetX;
			mousePos.y = event.offsetY;
		});
	});
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		margin: auto;
		display: block;
	}
</style>
