<script lang="ts">
	import { svgs } from '$lib/courses';
	import { irisButton } from '$lib/styles/emotion';
	import { onMount } from 'svelte';

	export let color: string;
	export let href: string;
	export let icon: string | undefined = undefined;

	const svg = icon === undefined ? '' : svgs[`./icons/${icon}.svg`];

	console.log(svg);
	console.log(svgs);
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
