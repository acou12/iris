<script lang="ts">
	import { p, Point } from '$lib/graphics/point/point';
	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';
	import { onDestroy, onMount } from 'svelte';
	import { allStates, EightGameState } from './eight';
	import { start_hydrating } from 'svelte/internal';

	// MAKE THIS LESS GARBAGE

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;

	let SIZE = 100;
	let MARGIN = 10;
	let ROUND = 10;

	class Tile {
		displayX: number;
		displayY: number;

		constructor(private label: string, private x: number, private y: number) {
			this.displayX = x;
			this.displayY = y;
		}

		change(x: number, y: number) {
			this.x = x;
			this.y = y;
		}

		update() {
			this.displayX += (this.x - this.displayX) * 0.1;
			this.displayY += (this.y - this.displayY) * 0.1;
		}

		draw(context: CanvasRenderingContext2D) {
			context.beginPath();
			context.roundRect(
				(SIZE + MARGIN) * this.displayX,
				(SIZE + MARGIN) * this.displayY,
				SIZE,
				SIZE,
				ROUND
			);
			context.fillStyle = '#666';
			context.fill();

			context.beginPath();
			context.roundRect(
				(SIZE + MARGIN) * this.displayX + 0.1 * SIZE,
				(SIZE + MARGIN) * this.displayY + 0.1 * SIZE,
				SIZE * 0.8,
				SIZE * 0.8,
				ROUND
			);
			context.fillStyle = '#444';
			context.fill();

			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillStyle = 'white';
			context.font = '30px monospace';
			context.fillText(
				this.label.toString(),
				(SIZE + MARGIN) * this.displayX + SIZE / 2,
				(SIZE + MARGIN) * this.displayY + SIZE / 2
			);
		}
	}

	let gameState: Map<number, Point>;
	let tiles: Map<number, Tile>;

	let lastTime: number = 0;

	let states: [number, EightGameState][];
	let stateIndex: Map<string, number>;
	let counts: Map<number, number>;
	let countsAcc: Map<number, number>;

	const getLocation = (state: EightGameState): undefined | Point => {
		if (!stateIndex.has(state.stringify())) {
			return undefined;
		}
		let index = stateIndex.get(state.stringify());
		let depth = states[index][0];
		let ringOffset = index - countsAcc.get(depth);
		let ringTotal = counts.get(depth);
		let theta = (ringOffset / ringTotal) * 2 * Math.PI;
		// + (2 * Math.PI) / ringTotal / 2;
		let dist = depth * 50;
		return p(Math.cos(theta) * dist + canvas.width / 2, Math.sin(theta) * dist + canvas.height / 2);
	};

	onMount(() => {
		states = allStates();

		stateIndex = new Map();
		for (let i = 0; i < states.length; i++) {
			stateIndex.set(states[i][1].stringify(), i);
		}

		counts = new Map();
		for (const [n, _] of states) {
			if (!counts.has(n)) {
				counts.set(n, 0);
			}

			counts.set(n, counts.get(n) + 1);
		}

		countsAcc = new Map();
		countsAcc.set(0, 0);

		let c = 1;
		while (counts.has(c)) {
			countsAcc.set(c, countsAcc.get(c - 1) + counts.get(c - 1));
			c += 1;
		}

		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);

		gameState = new Map();
		tiles = new Map();

		for (let i = 0; i < 15; i++) {
			gameState.set(i, new Point(i % 4, Math.floor(i / 4)));
			tiles.set(i, new Tile(i.toString(), 0, 0));
		}

		draw(0);

		canvas.addEventListener('click', (e) => {
			let tileX = Math.floor(e.offsetX / (SIZE + MARGIN));
			let tileY = Math.floor(e.offsetY / (SIZE + MARGIN));

			let offsets = [
				[0, 1],
				[0, -1],
				[1, 0],
				[-1, 0]
			];

			let [target, _tp] = [...gameState.entries()].find(([k, v]) => v.x === tileX && v.y === tileY);

			for (const [ox, oy] of offsets) {
				let empty = [...gameState.entries()].find(
					([k, v]) => v.x === tileX + ox && v.y === tileY + oy
				);
				if (
					empty === undefined &&
					0 <= tileX + ox &&
					tileX + ox < 4 &&
					0 <= tileY + oy &&
					tileY + oy < 4
				) {
					gameState.set(target, new Point(tileX + ox, tileY + oy));
					break;
				}
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'r') {
				for (let i = 0; i < 1000; i++) {
					let tileX = Math.floor(Math.random() * 5);
					let tileY = Math.floor(Math.random() * 5);

					let offsets = [
						[0, 1],
						[0, -1],
						[1, 0],
						[-1, 0]
					];

					let f = [...gameState.entries()].find(([k, v]) => v.x === tileX && v.y === tileY);

					if (f !== undefined) {
						let [target, _tp] = f;

						for (const [ox, oy] of offsets) {
							let empty = [...gameState.entries()].find(
								([k, v]) => v.x === tileX + ox && v.y === tileY + oy
							);
							if (
								empty === undefined &&
								0 <= tileX + ox &&
								tileX + ox < 4 &&
								0 <= tileY + oy &&
								tileY + oy < 4
							) {
								gameState.set(target, new Point(tileX + ox, tileY + oy));
								break;
							}
						}
					}
				}
			}
		});
	});

	onDestroy(() => {});

	const draw = (time: number) => {
		let delta: number;
		if (lastTime > 0) {
			delta = (time - lastTime) / 1000;
		} else {
			delta = 0;
		}
		lastTime = time;

		context.clearRect(0, 0, canvas.width, canvas.height);

		// for (let i = 0; i < 15; i++) {
		// 	let point = gameState.get(i);
		// 	let tile = tiles.get(i);
		// 	tile.change(point.x, point.y);
		// 	tile.update();
		// 	tile.draw(context);
		// }

		for (const [_, s] of states.slice(0, 1000)) {
			let location = getLocation(s);

			// context.beginPath();
			// context.arc(location.x, location.y, 8, 0, 2 * Math.PI);
			// context.fillStyle = 'black';
			// context.fill();

			context.fillStyle = 'black';

			let lines = s.stringify().split('\n').slice(0, 3);

			context.font = '25px monospace';
			context.textAlign = 'center';
			context.textBaseline = 'middle';

			context.fillText(lines[0].replace(/ /g, '').replace(/-1/g, ' '), location.x, location.y - 30);
			context.fillText(lines[1].replace(/ /g, '').replace(/-1/g, ' '), location.x, location.y);
			context.fillText(lines[2].replace(/ /g, '').replace(/-1/g, ' '), location.x, location.y + 30);

			for (const n of s.getMoves().map((m) => s.copyWithMove(m))) {
				let end = getLocation(n);
				let lineStart = p(
					location.x + (end.x - location.x) * 0.25,
					location.y + (end.y - location.y) * 0.25
				);
				let lineEnd = p(
					location.x + (end.x - location.x) * 0.75,
					location.y + (end.y - location.y) * 0.75
				);
				if (end !== undefined) {
					context.beginPath();
					context.lineWidth = 5;
					context.strokeStyle = 'black';
					context.moveTo(lineStart.x, lineStart.y);
					context.lineTo(lineEnd.x, lineEnd.y);
					context.stroke();
				}
			}
		}

		requestAnimationFrame(draw);
	};
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		width: 75%;
		height: 800px;
		margin: auto;
		display: block;
	}
</style>
