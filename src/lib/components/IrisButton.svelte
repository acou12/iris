<script lang="ts">
	import { svgs } from '$lib/courses';
	import { irisButton } from '$lib/styles/emotion';

	export let color: string;
	export let href: string;
	export let icon: string | undefined = undefined;
	export let enabled: boolean = true;

	const svg = icon === undefined ? '' : svgs[`./icons/${icon}.svg`];
</script>

<a href={enabled ? href : ''}>
	<div class={irisButton(color, enabled)}>
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
