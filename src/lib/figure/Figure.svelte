<script lang="ts">
	export let id: string;
	export let name: string;
	export let caption: string;
</script>

<div id={name}>
	<slot />
	<div class="caption">
		Figure {id}: {caption}
	</div>
</div>

<style>
	.caption {
		max-width: 800px;
		margin: auto;
		font-size: 20px;
		color: gray;
		text-align: center;
	}
</style>
