import { p, Point } from '$lib/graphics/point/point';

export class EightGameMove {
	constructor(public from: Point, public to: Point) {}
}

export class EightGameState {
	private tiles: number[][];
	private empty: Point;

	constructor() {
		this.tiles = [
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, -1]
		];
		this.empty = p(2, 2);
	}

	private inBounds(point: Point): boolean {
		return 0 <= point.x && point.x < 3 && 0 <= point.y && point.y < 3;
	}

	getMoves(): EightGameMove[] {
		const offsets = [p(0, 1), p(0, -1), p(1, 0), p(-1, 0)];

		const moves: EightGameMove[] = [];

		for (const o of offsets) {
			if (this.inBounds(this.empty.add(o))) {
				moves.push(new EightGameMove(this.empty.add(o), this.empty.copy()));
			}
		}

		return moves;
	}

	copyWithMove(move: EightGameMove): EightGameState {
		const result = new EightGameState();
		result.tiles = this.tiles.map((col) => [...col]);

		// swap the two tiles

		const from = result.tiles[move.from.x][move.from.y];
		const to = result.tiles[move.to.x][move.to.y];

		result.tiles[move.from.x][move.from.y] = to;
		result.tiles[move.to.x][move.to.y] = from;

		result.empty = move.from.copy();

		return result;
	}

	stringify(): string {
		let result = ``;
		for (let y = 0; y < 3; y++) {
			for (let x = 0; x < 3; x++) {
				result += this.tiles[x][y].toString().padStart(2, ' ') + ' ';
			}
			result += '\n';
		}
		return result;
	}
}

export const allStates = () => {
	const beginning = new EightGameState();
	const done: Set<string> = new Set();
	const allStates: [number, EightGameState][] = [];
	const fringe = [[0, beginning]] as [number, EightGameState][];
	while (fringe.length > 0 && done.size < 1000) {
		const [n, state] = fringe.shift();
		if (!done.has(state.stringify())) {
			done.add(state.stringify());
			allStates.push([n, state]);
			for (const newState of state.getMoves().map((m) => state.copyWithMove(m))) {
				fringe.push([n + 1, newState]);
			}
		}
	}
	return allStates;
};
