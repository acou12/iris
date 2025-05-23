<script lang="ts">
	import type { StructuredArticle } from './article';
	import ArticleContents from './ArticleContents.svelte';

	export let article: StructuredArticle;
</script>

<ArticleContents elements={article.elements} />
