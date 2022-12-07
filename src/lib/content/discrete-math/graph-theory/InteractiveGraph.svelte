<script lang="ts">
	import { withPixi } from '$lib/util/custom-lifecycle';
	import type { Graphics } from 'pixi.js';

	let canvas: HTMLCanvasElement;

	withPixi(async (PIXI) => {
		const app = new PIXI.Application({
			view: canvas,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0xffffff
		});

		const nodes: Graphics[] = [];

		for (let i = 0; i < 10; i++) {
			const node = new PIXI.Graphics();
			node.beginFill(0);
			node.drawCircle(0, 0, 10);
			node.x = Math.random() * (app.screen.width - 20) + 10;
			node.y = Math.random() * (app.screen.height - 20) + 10;
			app.stage.addChild(node);
			nodes.push(node);
		}

		const edges: [number, number][] = [];

		for (let i = 0; i < 20; i++) {
			const edge = [
				Math.floor(Math.random() * nodes.length),
				Math.floor(Math.random() * nodes.length)
			] as [number, number];
			const physicalEdge = new PIXI.Graphics();
			physicalEdge.lineStyle({
				width: 4,
				color: 0
			});
			physicalEdge.moveTo(nodes[edge[0]].x, nodes[edge[0]].y);
			physicalEdge.lineTo(nodes[edge[1]].x, nodes[edge[1]].y);
			app.stage.addChild(physicalEdge);
			edges.push(edge);
		}

		let t = 0;

		const ticker = app.ticker.add((delta) => {
			t += delta;
		});

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
