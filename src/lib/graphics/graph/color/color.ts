export class Color {
	constructor(public r: number, public g: number, public b: number) {}
	toString(): string {
		return `rgb(${this.r}, ${this.g}, ${this.b})`;
	}
}

export const lighten = (color: Color) => {
	return new Color(
		color.r + (255 - color.r) / 2,
		color.g + (255 - color.g) / 2,
		color.b + (255 - color.b) / 2
	);
};
