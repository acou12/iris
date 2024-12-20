import * as PIXI from 'pixi.js';

export class SpringMass {
	public pixi: PIXI.Container;
	private mass: PIXI.Graphics;
	private spring: PIXI.Graphics;
	private realLength: number;
	private _extension: number;

	private COIL_LENGTH = 40;

	constructor(private springLen: number, private massSize: number) {
		this.realLength = springLen - massSize / 2;
		this.spring = new PIXI.Graphics();
		this.spring.lineStyle({
			width: 5,
			color: 0x999999
		});
		this.spring.moveTo(0, 0);
		for (let x = 0; x <= this.realLength - (this.realLength % (this.COIL_LENGTH / 2)); x++) {
			this.spring.lineTo(x, -Math.sin((x * 2 * Math.PI) / this.COIL_LENGTH) * 50);
		}
		this.spring.lineTo(this.realLength, 0);

		this.mass = new PIXI.Graphics();
		this.mass.beginFill(0);
		this.mass.drawRect(0, 0, massSize, massSize);
		this.mass.endFill();
		this.mass.pivot.x = this.mass.width / 2;
		this.mass.pivot.y = this.mass.height / 2;
		this.mass.x = springLen;

		this.pixi = new PIXI.Container();
		this.pixi.addChild(this.spring);
		this.pixi.addChild(this.mass);
	}

	public set extension(e: number) {
		this.mass.x = this.springLen + e;
		this.spring.scale.x = (this.realLength + e) / this.realLength;
		this._extension = e;
	}

	public get extension() {
		return this._extension;
	}
}

export type Vector = {
	x: number;
	y: number;
};

export class VectorField {
	public pixi: PIXI.Container;

	SIZE = 400;

	constructor(_f: (v: Vector) => Vector) {
		this.pixi = new PIXI.Container();
		const lines = new PIXI.Graphics();
		lines.lineStyle({
			width: 3,
			color: 0
		});
		lines.moveTo(-this.SIZE, 0);
		lines.lineTo(this.SIZE, 0);
		lines.moveTo(0, -this.SIZE);
		lines.lineTo(0, this.SIZE);
		lines.lineStyle({
			width: 1,
			color: 0
		});
		for (let x = 0; x < this.SIZE; x += this.SIZE / 10) {
			lines.moveTo(x, this.SIZE);
			lines.lineTo(x, -this.SIZE);
			lines.moveTo(-x, this.SIZE);
			lines.lineTo(-x, -this.SIZE);
		}
		for (let y = 0; y < this.SIZE; y += this.SIZE / 10) {
			lines.moveTo(this.SIZE, y);
			lines.lineTo(-this.SIZE, y);
			lines.moveTo(this.SIZE, -y);
			lines.lineTo(-this.SIZE, -y);
		}
		// function drawVector(x: number, y: number) {}
		this.pixi.addChild(lines);
	}
}
