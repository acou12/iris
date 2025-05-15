import { LaTeXFunction } from '$lib/psuedocode';

type Svelte = typeof import('*.md').default;

export class Article {
	constructor(public title: string, public elements: ArticleElement[]) {}
}
export const article = (title: string, elements: ArticleElement[]): Article =>
	new Article(title, elements);

export enum ArticleElementType {
	HEADER,
	SUBHEADER,
	SUBSUBHEADER,
	PARAGRAPH,
	FIGURE,
	ALGORITHM,
	SVELTE_COMPONENT
}

export type ArticleElement =
	| {
			type: ArticleElementType.HEADER;
			value: Header;
	  }
	| {
			type: ArticleElementType.SUBHEADER;
			value: Subheader;
	  }
	| {
			type: ArticleElementType.SUBSUBHEADER;
			value: Subsubheader;
	  }
	| {
			type: ArticleElementType.PARAGRAPH;
			value: Paragraph;
	  }
	| {
			type: ArticleElementType.FIGURE;
			value: Figure;
	  };

export class Header {
	constructor(public text: string) {}
}
export const h1 = (text: string): ArticleElement => ({
	type: ArticleElementType.HEADER,
	value: new Header(text)
});

export class Subheader {
	constructor(public text: string) {}
}
export const h2 = (text: string): ArticleElement => ({
	type: ArticleElementType.SUBHEADER,
	value: new Subheader(text)
});

export class Subsubheader {
	constructor(public text: string) {}
}
export const h3 = (text: string): ArticleElement => ({
	type: ArticleElementType.SUBSUBHEADER,
	value: new Subsubheader(text)
});

export class Paragraph {
	constructor(public text: string) {}
}
export const p = (text: string): ArticleElement => ({
	type: ArticleElementType.PARAGRAPH,
	value: new Paragraph(text)
});

export class Figure {
	constructor(public svelteComponent: SvelteComponent, public caption: string) {}
}

export const fig = (svelteComponent: Svelte, caption: string): ArticleElement => ({
	type: ArticleElementType.FIGURE,
	value: new Figure(new SvelteComponent(svelteComponent), caption)
});

export class ArticleAlgorithm {
	constructor(public alg: LaTeXFunction, public caption: string) {}
}

export class SvelteComponent {
	constructor(public svelte: Svelte) {}
}

import Graph from '$lib/content/algorithms/graph-algorithms/graph.svelte';

export const testArticle = article('Test Article', [
	h1(`This is a test.`),
	p(`Here is some text. It contains **bold** as well as $\\LaTeX$ (or, *will*, at least).`),
	h2(`The Subheader`),
	p(`Lorem inpsum blah blah blah blah`),
	fig(Graph, `This is a figure. Let $x \\in \\mathbb{R}$.`)
]);
