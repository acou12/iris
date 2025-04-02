<script lang="ts">
	export let title: string;

	let toggled = false;

	const toggle = () => {
		toggled = !toggled;
	};
</script>

<button on:click={toggle} class="dropdown-title" class:toggled>{title}</button>

<div class="dropdown">
	{#if toggled}
		<slot />
	{/if}
</div>

<style lang="scss">
	.dropdown {
		border-left: solid 5px rgb(225, 225, 225);
		padding-left: 20px;
	}
</style>
