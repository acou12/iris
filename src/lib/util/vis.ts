import * as PIXI from 'pixi.js';

export class SpringMass {
	public pixi: PIXI.Container;
	private mass: PIXI.Graphics;
	private spring: PIXI.Graphics;
	private realLength: number;
	private _extension: number;

	private COIL_LENGTH = 50;

	constructor(private springLen: number, private massSize: number) {
		this.realLength = springLen - massSize / 2;
		this.spring = new PIXI.Graphics();
		this.spring.lineStyle({
			width: 5,
			color: 0x999999
		});
		this.spring.moveTo(0, 0);
		for (let x = 0; x <= this.realLength - (this.realLength % this.COIL_LENGTH); x++) {
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
	}

	public get extension() {
		return this._extension;
	}
}
