<script lang="ts">
	import * as ps from '$lib/psuedocode';
	import katex from 'katex';
	import { onMount } from 'svelte';

	let s = '';

	onMount(() => {
		const f = ps.func(
			'TestFunction',
			['x', 'y', 'z'],
			[
				ps.generals([`x \\gets y + z`]),
				ps.generals([`y \\gets x + z`]),
				ps.generals([`z \\gets y + x`]),
				ps.ifs('x < y', [ps.generals([`y \\gets x + z`]), ps.generals([`z \\gets y + x`])]),
				ps.whiles('xyz \\leq 10', [
					ps.whiles('xyz \\leq 10', [
						ps.generals([``, `Let `, `z \\sim \\mathcal{E}([1, \\infty])`])
					]),
					ps.generals([``, `Let `, `y \\sim \\mathcal{U}([0, 1])`])
				]),
				ps.generals([`\\textbf{return } z^2`])
			]
		);
		const f2 = ps.func(
			'Search',
			['G', 'u'],
			[
				ps.generals([`X \\gets \\{ u \\}`]),
				ps.whiles('\\text{there exists a fringe vertex } v', [
					ps.generals([`X \\gets X \\cup \\{ v \\}`])
				])
			]
		);
		s = katex.renderToString(ps.renderedLinesToLaTeX(f2.render(0)), {
			displayMode: true
		});
	});
</script>

{@html s}
