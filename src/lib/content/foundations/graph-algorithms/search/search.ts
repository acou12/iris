export interface GraphSearcher<T> {
	initalize(start: T): void;
	hasTerminated(): boolean;
	step(): void;
}
