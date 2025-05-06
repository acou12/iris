import * as ps from '$lib/psuedocode';

export const dijkstrasSearch = ps.func(
	"Dijkstra'sAlgorithm",
	['G', 'v_s'],
	[
		ps.generals([`X \\gets`, `new set`]),
		ps.generals([`D \\gets`, `new dictionary `, `(V \\to \\mathbb{R})`]),
		ps.generals([`F \\gets`, `new priority queue `, `(V \\times \\mathbb{R})`]),
		ps.generals([``, `add `, `(v_s, 0)`, ` to `, `F`]),
		ps.whiles('|F| > 0', [
			ps.generals([`(v, d) \\gets`, `minimum of `, `F`]),
			ps.ifs(`v \\text{ is not in } X`, [
				ps.generals([``, `set `, `D(v) = d`]),
				ps.generals([`X \\gets X \\cup \\{ v \\}`]),
				ps.fors('\\text{neighbor } n \\text{ of } v \\text{ in } G', [
					ps.generals([``, `add `, `(n, d + w(u, n))`, ` to `, `F`])
				])
			])
		]),
		ps.generals([``, `\\textbf{return} `, `D`])
	]
);
