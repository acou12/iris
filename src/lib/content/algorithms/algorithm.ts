export interface Algorithm<T> {
	initalize(start: T): void;
	hasTerminated(): boolean;
	step(): void;
}
