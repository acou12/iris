<script lang="ts">
	import { onNavigate, withPixi } from '$lib/util/custom-lifecycle';
	import { ComplexNumber, ComplexVector2 } from '$lib/util/imaginary';

	let canvas: HTMLCanvasElement;

	let stop: () => void;

	withPixi(async (PIXI) => {
		const VIS = await import('$lib/util/vis');
		const app = new PIXI.Application({
			view: canvas,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0xffffff,
			width: 1000,
			height: 500
		});

		const c1 = new PIXI.Graphics();
		const c2 = new PIXI.Graphics();
		const c1I = new PIXI.Graphics();
		const c2I = new PIXI.Graphics();

		[c1, c2, c1I, c2I].forEach((graphics, i) => {
			graphics.beginFill(i >= 2 ? 0xff00ff : 0xff0000);
			graphics.drawCircle(0, 0, 20);
		});

		let position1 = new ComplexVector2(new ComplexNumber(500 - 100, 0), new ComplexNumber(250, 0));
		let position2 = new ComplexVector2(new ComplexNumber(500 + 100, 0), new ComplexNumber(250, 0));

		let velocity1 = new ComplexVector2(new ComplexNumber(0, 0), new ComplexNumber(1, 0));
		let velocity2 = new ComplexVector2(new ComplexNumber(0, 0), new ComplexNumber(-1, 0));

		const dtdtau = new ComplexNumber(1, 0.1);

		const ticker = app.ticker.add((delta) => {
			const forceMagnitude = 500 / Math.pow(position1.distance(position2), 2);

			velocity1 = velocity1.add(
				position2.subtract(position1).normalized().multiply(forceMagnitude).multiplyComplex(dtdtau)
			);
			velocity2 = velocity2.add(
				position1.subtract(position2).normalized().multiply(forceMagnitude).multiplyComplex(dtdtau)
			);

			position1 = position1.add(velocity1.multiplyComplex(dtdtau));
			position2 = position2.add(velocity2.multiplyComplex(dtdtau));

			c1.position.x = position1.x.real;
			c1.position.y = position1.y.real;
			c2.position.x = position2.x.real;
			c2.position.y = position2.y.real;

			c1I.position.x = position1.x.real + position1.x.imaginary;
			c1I.position.y = position1.y.real + position1.y.imaginary;
			c2I.position.x = position2.x.real + position2.x.imaginary;
			c2I.position.y = position2.y.real + position2.y.imaginary;
		});

		stop = () => {
			app.destroy();
			ticker.stop();
		};

		app.stage.addChild(c1I);
		app.stage.addChild(c2I);
		app.stage.addChild(c1);
		app.stage.addChild(c2);

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
