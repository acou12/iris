<script lang="ts">
	// @hmr:reset
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

		function ball(r: number) {
			return new PIXI.Graphics().lineStyle({ color: 0, width: 5 }).arc(0, 0, r, 0, Math.PI * 2);
		}

		function arrow(len: number) {
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
		}

		let v1 = 1;
		let v2 = 0;

		const v1arrow = arrow(60);
		v1arrow.tint = 0xff00ff;
		const v2arrow = arrow(60);
		v2arrow.tint = 0xff00ff;

		const force1 = arrow(30);
		force1.tint = 0xff9d00;
		const force2 = arrow(30);
		force2.tint = 0xff9d00;
		force2.rotation = Math.PI;

		const BALL_RADIUS = 100;

		const ball1 = ball(BALL_RADIUS);
		ball1.x = app.screen.width / 2 - v1 * 4 * 60;
		ball1.y = app.screen.height / 2;
		const ball2 = ball(BALL_RADIUS);
		ball2.x = app.screen.width / 2 - v2 * 4 * 60;
		ball2.y = app.screen.height / 2;

		const ticker = app.ticker.add((delta) => {
			ball1.x += v1;
			ball2.x += v2;
			v1arrow.x = ball1.x;
			v1arrow.y = ball1.y;
			v2arrow.x = ball2.x;
			v2arrow.y = ball2.y;
			v1arrow.scale.x = v1;
			v1arrow.scale.y = v1;
			v2arrow.scale.x = v2;
			v2arrow.scale.y = v2;
			if (ball1.x + BALL_RADIUS > ball2.x - BALL_RADIUS) {
				v1 -= 0.01;
				v2 += 0.01;
				ball1.scale.x = Math.abs(ball1.x - ball2.x) / (BALL_RADIUS * 2);
				ball2.scale.x = Math.abs(ball1.x - ball2.x) / (BALL_RADIUS * 2);
				// [v1, v2] = [v2, v1];
				force1.visible = true;
				force2.visible = true;
				force1.x = ball1.x + ball1.width / 2;
				force2.x = ball1.x + ball1.width / 2;
				force1.y = ball1.y;
				force2.y = ball1.y;
			} else {
				force1.visible = false;
				force2.visible = false;
			}
		});

		app.stage.addChild(ball1);
		app.stage.addChild(ball2);
		app.stage.addChild(v1arrow);
		app.stage.addChild(v2arrow);
		app.stage.addChild(force1);
		app.stage.addChild(force2);
	});
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		margin: auto;
		display: block;
	}
</style>
