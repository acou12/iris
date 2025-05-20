import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkSmartyPants from 'remark-smartypants';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

export const pretty = async (s: string) => {
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
	let r = String(await proc.process(s)).replaceAll(/(<p>|<\/p>)/g, '');
	// preserve leading and trailing spaces
	if (s.startsWith(' ')) {
		r = ' ' + r;
	}
	if (s.endsWith(' ')) {
		r = r + ' ';
	}
	return r;
};
