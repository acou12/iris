import { AnimatedColor } from '$lib/graphics/graph/color/animated-color';
import { Color, lighten } from '$lib/graphics/graph/color/color';
import { p, Point } from '$lib/graphics/point/point';
import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

enum BlockState {
	UNTOUCHED,
	INTERSECTING,
	DONE,
	COLLIDED
}

class Block {
	public state: BlockState;
	public color: AnimatedColor;

	constructor(public topLeft: Point, public bottomRight: Point) {
		this.state = BlockState.UNTOUCHED;
		this.color = new AnimatedColor(new Color(0, 0, 0));
	}

	update(delta: number): void {
		this.color.update(delta);
		switch (this.state) {
			case BlockState.UNTOUCHED:
				this.color.animateTo(new Color(0, 0, 0));
				break;
			case BlockState.INTERSECTING:
				this.color.animateTo(new Color(111, 26, 214));
				break;
			case BlockState.DONE:
				this.color.animateTo(new Color(0, 0, 0));
				break;
			case BlockState.COLLIDED:
				this.color.animateTo(new Color(255, 0, 0));
				break;
		}
	}

	draw(primative: PrimativeDrawer): void {
		primative.drawRect(this.topLeft, this.bottomRight, {
			fill: this.color.getAnimatedColor().toString(),
			stroke: lighten(this.color.getAnimatedColor()).toString(),
			strokeWidth: 5
		});
	}
}

export class SweepLineVisualization {
	private sweepLinePosition: number;
	private blocks: Block[];

	private interactiveMode: boolean;
	private mousePosition: Point;

	private initializeRandomBlocks() {
		this.sweepLinePosition = 0;
		this.blocks = [];

		for (let i = 0; i < 30; i++) {
			let width = Math.floor(Math.random() * 50) + 50;
			let height = Math.floor(Math.random() * 50) + 50;

			let x = Math.floor(Math.random() * (this.primative.getCanvasDimensions().x - width));
			let y = Math.floor(Math.random() * (this.primative.getCanvasDimensions().y - height));

			this.blocks.push(new Block(p(x, y), p(x + width, y + height)));
		}
	}

	constructor(private primative: PrimativeDrawer) {
		this.initializeRandomBlocks();

		this.interactiveMode = false;
		this.mousePosition = undefined;

		document.addEventListener('keydown', (e) => {
			if (e.key === 'r') {
				this.initializeRandomBlocks();
			}
		});

		document.addEventListener('mousemove', (e) => {
			this.mousePosition = p(e.offsetX, e.offsetY);
		});

		document.addEventListener('click', (_e) => {
			this.interactiveMode = !this.interactiveMode;
		});
	}

	update(delta: number): void {
		for (const block of this.blocks) {
			block.update(delta);
			switch (block.state) {
				case BlockState.UNTOUCHED:
					if (block.topLeft.x < this.sweepLinePosition) {
						block.state = BlockState.INTERSECTING;
						for (const otherBlock of this.blocks) {
							if (
								(otherBlock.state === BlockState.INTERSECTING ||
									otherBlock.state === BlockState.COLLIDED) &&
								block !== otherBlock
							) {
								if (
									((block.topLeft.x <= otherBlock.topLeft.x &&
										otherBlock.topLeft.x <= block.bottomRight.x) ||
										(otherBlock.topLeft.x <= block.topLeft.x &&
											block.topLeft.x <= otherBlock.bottomRight.x)) &&
									((block.topLeft.y <= otherBlock.topLeft.y &&
										otherBlock.topLeft.y <= block.bottomRight.y) ||
										(otherBlock.topLeft.y <= block.topLeft.y &&
											block.topLeft.y <= otherBlock.bottomRight.y))
								) {
									block.state = BlockState.COLLIDED;
									otherBlock.state = BlockState.COLLIDED;
								}
							}
						}
					}
					break;
				case BlockState.INTERSECTING:
					if (block.bottomRight.x < this.sweepLinePosition) {
						block.state = BlockState.DONE;
					}
					break;
				case BlockState.DONE:
					break;
				case BlockState.COLLIDED:
					break;
			}
		}

		if (this.interactiveMode) {
			this.sweepLinePosition = this.mousePosition.x;
		}

		this.sweepLinePosition += (delta * this.primative.getCanvasDimensions().x) / 10;
		if (this.sweepLinePosition > this.primative.getCanvasDimensions().x) {
			for (const block of this.blocks) {
				block.state = BlockState.UNTOUCHED;
			}
			this.sweepLinePosition = -10;
		}
	}

	draw(): void {
		for (const block of this.blocks) {
			block.draw(this.primative);
		}

		this.primative.drawLine(
			p(this.sweepLinePosition, 0),
			p(this.sweepLinePosition, this.primative.getCanvasDimensions().y),
			{
				stroke: 'black',
				strokeWidth: 10
			}
		);
	}
}
