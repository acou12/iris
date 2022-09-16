<script lang="ts">
	import { irisButton } from '$lib/styles/emotion';

	export let color: string;
	export let href: string;
	export let icon: string | undefined = undefined;
</script>

<a {href}>
	<div class={irisButton(color)}>
		<slot />
		{#if icon !== undefined}
			<img src={icon} alt={`The ${icon} icon.`} />
		{/if}
		<!-- kind of bad -->
	</div>
</a>

<style lang="scss">
	a {
		text-decoration: none;
	}

	div {
		position: relative;
	}

	img {
		position: absolute;
		right: 50px;
		top: 10%;
		height: 80%;
	}
</style>
