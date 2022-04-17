<script lang="ts">
	import katex from 'katex';
	export let math: string;
</script>

{@html katex.renderToString(math, {
	displayMode: false
})}
