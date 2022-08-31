<script lang="ts">
	import hl from 'highlight.js';
	import { onNavigate } from '$lib/util/custom-lifecycle';

	onNavigate(
		() => {
			document.querySelectorAll('code').forEach((el) => hl.highlightElement(el));
		},
		() => {}
	);
</script>

<slot />
