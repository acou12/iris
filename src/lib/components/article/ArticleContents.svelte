<script lang="ts">
	import { ArticleElementType, ParagraphPartType } from './article';
	import type { ArticleElement } from './article';
	import { onMount } from 'svelte';

	import Psuedocode from '../Psuedocode.svelte';
	import Dropdown from './Dropdown.svelte';
	import { pretty } from './render';
	import TextContent from './TextContent.svelte';

	import katex from 'katex';

	export let elements: ArticleElement[];

	onMount(() => {});
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
		<p>
			<TextContent parts={element.value.parts} />
		</p>
	{:else if element.type === ArticleElementType.LIST}
		<ul>
			{#each element.value.elements as li}
				<li>
					<TextContent parts={li.parts} />
				</li>
			{/each}
		</ul>
	{:else if element.type === ArticleElementType.BLOCK_MATH}
		{@html katex.renderToString(element.value.lines.join('\\'), { displayMode: true })}
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
