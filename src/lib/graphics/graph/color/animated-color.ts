import { Color } from './color';

const ANIMATION_SPEED = 0.1;

export class AnimatedColor {
	private currentColor: Color;
	private toColor: Color;

	constructor(initialColor: Color) {
		this.currentColor = initialColor;
		this.toColor = initialColor;
	}

	animateTo(newColor: Color): void {
		this.toColor = newColor;
	}

	getAnimatedColor(): Color {
		return this.currentColor;
	}

	update(delta: number): void {
		this.currentColor.r += (this.toColor.r - this.currentColor.r) * ANIMATION_SPEED;
		this.currentColor.g += (this.toColor.g - this.currentColor.g) * ANIMATION_SPEED;
		this.currentColor.b += (this.toColor.b - this.currentColor.b) * ANIMATION_SPEED;
	}
}
