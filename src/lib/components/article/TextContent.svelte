<script lang="ts">
	import { ParagraphPartType } from './article';
	import type { ParagraphPart } from './article';
	import { pretty } from './render';

	export let parts: ParagraphPart[];
</script>

{#each parts as part}
	{#if part.type === ParagraphPartType.TEXT}
		{#await pretty(part.value.text) then t}
			{@html t}
		{/await}
	{:else if part.type === ParagraphPartType.INLINE_COMPONENT}
		<svelte:component this={part.value.component} />
	{/if}
{/each}
