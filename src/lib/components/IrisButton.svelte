<script lang="ts">
	import { irisButton } from '$lib/styles/emotion';
	import { css } from '@emotion/css';
	import { onMount } from 'svelte';

	export let color: string;
	export let href: string;
	export let icon: string | undefined = undefined;

	let svg = '';

	onMount(async () => {
		if (icon !== undefined) {
			svg = (await import(`../icons/${icon}.svg?raw`)).default;
			console.log(svg);
		}
	});
</script>

<a {href}>
	<div class={irisButton(color)}>
		<slot />
		{@html svg}
	</div>
</a>

<style lang="scss">
	a {
		text-decoration: none;
	}

	div {
		position: relative;
	}
</style>
