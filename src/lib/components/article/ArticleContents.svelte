<script lang="ts">
	import { ArticleElementType } from './article';
	import type { ArticleElement } from './article';
	import { onMount } from 'svelte';

	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import remarkMath from 'remark-math';
	import remarkGfm from 'remark-gfm';
	import remarkSmartyPants from 'remark-smartypants';
	import rehypeKatex from 'rehype-katex';
	import rehypeStringify from 'rehype-stringify';
	import Psuedocode from '../Psuedocode.svelte';
	import { element } from 'svelte/internal';
	import Dropdown from './Dropdown.svelte';

	export let elements: ArticleElement[];

	onMount(() => {});

	const pretty = async (s: string) => {
		const proc = unified()
			.use(remarkParse)
			.use(remarkMath)
			.use(remarkGfm)
			.use(remarkRehype)
			.use(remarkSmartyPants)
			.use(rehypeKatex)
			// @ts-ignore
			.use(rehypeStringify);

		// @ts-ignore
		return String(await proc.process(s)).replaceAll(/(<p>|<\/p>)/g, '');
	};
</script>

{#each elements as element}
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
	{:else if element.type === ArticleElementType.ALGORITHM}
		<Psuedocode fn={element.value.alg} />
		<div class="caption">
			{#await pretty(element.value.caption) then t}
				Algorithm 1: {@html t}
			{/await}
		</div>
	{:else if element.type === ArticleElementType.DROPDOWN_SECTION}
		{#await pretty(element.value.title) then t}
			<Dropdown title={t}>
				<svelte:self elements={element.value.elements} />
			</Dropdown>
		{/await}
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
