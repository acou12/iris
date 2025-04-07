<script lang="ts">
	import * as ps from '$lib/psuedocode';
	import katex from 'katex';
	import { onMount } from 'svelte';

	export let fn: ps.LaTeXFunction;
	let s = '';

	onMount(() => {
		s = katex.renderToString(ps.renderedLinesToLaTeX(fn.render(0)), {
			displayMode: true
		});
	});
</script>

{@html s}
