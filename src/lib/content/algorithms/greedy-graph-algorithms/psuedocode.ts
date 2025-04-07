import * as ps from '$lib/psuedocode';

export const dijkstrasSearch = ps.func(
	"Dijkstra'sAlgorithm",
	['G', 'u'],
	[
		ps.generals([`F \\gets`, ` new queue`]),
		ps.generals([`W \\gets`, ` new ordered dictionary `, `(\\mathcal{N} \\to \\mathbb{R})`]),
		ps.generals([``, `set `, `W(v) = \\infty`, ` for all `, `v`]),
		ps.generals([``, `add `, `u`, ` to `, `F`]),
		ps.whiles('|F| > 0', [
			ps.generals([`v \\gets `, ` pop from `, `F`]),
			ps.generals([`X \\gets X \\cup \\{ v \\}`]),
			ps.generals([``, `enqueue each of `, `v`, `'s neighbors to `, `F`])
		])
	]
);
