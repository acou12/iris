export type FigureSettings = {
	/** (css string) */
	width: string;
	/** (css string) */
	height: string;
};

export interface Figure {
	settings(): FigureSettings;
	update(): void;
	draw(delta: number): void;
}
