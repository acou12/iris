<script lang="ts">
	import { Article, ArticleElementType } from './article';
	import { onMount } from 'svelte';

	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	import rehypeStringify from 'rehype-stringify';

	export let article: Article;

	onMount(() => {});

	const pretty = async (s: string) => {
		const proc = unified()
			.use(remarkParse)
			.use(remarkMath)
			.use(remarkRehype)
			.use(rehypeKatex)
			// @ts-ignore
			.use(rehypeStringify);

		return String(await proc.process(s)).slice(3, -4);
	};
</script>

{#each article.elements as element}
	{#if element.type === ArticleElementType.HEADER}
		{#await pretty(element.value.text) then t}
			<h1>{@html t}</h1>
		{/await}
	{:else if element.type === ArticleElementType.SUBHEADER}
		{#await pretty(element.value.text) then t}
			<h2>{@html t}</h2>
		{/await}
	{:else if element.type === ArticleElementType.SUBSUBHEADER}
		{#await pretty(element.value.text) then t}
			<h3>{@html t}</h3>
		{/await}
	{:else if element.type === ArticleElementType.PARAGRAPH}
		{#await pretty(element.value.text) then t}
			<p>{@html t}</p>
		{/await}
	{:else if element.type === ArticleElementType.FIGURE}
		<svelte:component this={element.value.svelteComponent.svelte} />
		<div class="caption">
			{#await pretty(element.value.caption) then t}
				Figure 1: {@html t}
			{/await}
		</div>
	{/if}
{/each}

<style lang="scss">
	.caption {
		max-width: 800px;
		margin: auto;
		font-size: 20px;
		color: gray;
		text-align: center;
	}
</style>
