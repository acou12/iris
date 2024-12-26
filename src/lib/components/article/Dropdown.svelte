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
