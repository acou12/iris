<script lang="ts">
	import type { Article } from './article';
	import { onMount } from 'svelte';

	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import remarkMath from 'remark-math';
	import remarkGfm from 'remark-gfm';
	import remarkSmartyPants from 'remark-smartypants';
	import rehypeKatex from 'rehype-katex';
	import rehypeStringify from 'rehype-stringify';
	import ArticleContents from './ArticleContents.svelte';

	export let article: Article;

	onMount(() => {});

	const pretty = async (s: string) => {
		const proc = unified()
			.use(remarkParse)
			.use(remarkMath)
			.use(remarkGfm)
			.use(remarkRehype)
			.use(remarkSmartyPants)
			.use(rehypeKatex)
			// @ts-ignore
			.use(rehypeStringify);

		// @ts-ignore
		return String(await proc.process(s)).replaceAll(/(<p>|<\/p>)/g, '');
	};
</script>

<ArticleContents elements={article.elements} />
