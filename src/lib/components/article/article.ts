import { LaTeXFunction } from '$lib/psuedocode';

type Svelte = typeof import('*.md').default;

export class Article {
	constructor(public title: string, public elements: ArticleElement[]) {}
}
export const article = (title: string, elements: () => ArticleElement[]): Article =>
	new Article(title, elements());

export enum ArticleElementType {
	HEADER,
	SUBHEADER,
	SUBSUBHEADER,
	PARAGRAPH,
	LIST,
	BLOCK_MATH,
	FIGURE,
	ALGORITHM,
	SVELTE_COMPONENT,
	DROPDOWN_SECTION
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
			type: ArticleElementType.LIST;
			value: List;
	  }
	| {
			type: ArticleElementType.BLOCK_MATH;
			value: BlockMath;
	  }
	| {
			type: ArticleElementType.FIGURE;
			value: Figure;
	  }
	| {
			type: ArticleElementType.ALGORITHM;
			value: ArticleAlgorithm;
	  }
	| {
			type: ArticleElementType.DROPDOWN_SECTION;
			value: DropdownSection;
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

export enum ParagraphPartType {
	TEXT,
	INLINE_COMPONENT
}

export type ParagraphPart =
	| {
			type: ParagraphPartType.TEXT;
			value: ParagraphText;
	  }
	| {
			type: ParagraphPartType.INLINE_COMPONENT;
			value: ParagraphInlineComponent;
	  };

export class ParagraphText {
	constructor(public text: string) {}
}
export class ParagraphInlineComponent {
	constructor(public component: Svelte, public params: any[]) {}
}

export class Paragraph {
	constructor(public parts: ParagraphPart[]) {}
}
export const p = (text: TemplateStringsArray, ...values: ParagraphPart[]): ArticleElement => {
	const parts: ParagraphPart[] = [];
	for (let i = 0; i < text.length; i++) {
		if (i > 0) {
			parts.push(values[i - 1]);
		}
		parts.push({ type: ParagraphPartType.TEXT, value: new ParagraphText(text[i]) });
	}
	return {
		type: ArticleElementType.PARAGRAPH,
		value: new Paragraph(parts)
	};
};

export class List {
	constructor(public elements: Paragraph[]) {}
}
export const ul = (ps: ArticleElement[]): ArticleElement => {
	return {
		type: ArticleElementType.LIST,
		value: new List(ps.map((p) => p.value as Paragraph))
	};
};

export class BlockMath {
	constructor(public lines: string[]) {}
}

export const math = (lines: string[]): ArticleElement => ({
	type: ArticleElementType.BLOCK_MATH,
	value: new BlockMath(lines)
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

export const alg = (func: LaTeXFunction, caption: string): ArticleElement => ({
	type: ArticleElementType.ALGORITHM,
	value: new ArticleAlgorithm(func, caption)
});

export class SvelteComponent {
	constructor(public svelte: Svelte) {}
}

export class DropdownSection {
	constructor(public title: string, public elements: ArticleElement[]) {}
}

export class FigureReference {
	constructor(public code: string) {}
}

export class FigureManager {
	n: number;
	numberMap: Map<string, number>;

	constructor() {
		this.n = 1;
	}

	newFigure(code: string): FigureReference {
		this.numberMap.set(code, this.n);
		this.n++;
		return new FigureReference(code);
	}

	getFigureNumber(ref: FigureReference): number {
		return this.numberMap.get(ref.code);
	}
}

export const dropdown = (title: string, elements: ArticleElement[]): ArticleElement => ({
	type: ArticleElementType.DROPDOWN_SECTION,
	value: new DropdownSection(title, elements)
});

import Todo from './Todo.svelte';

export const todo: ParagraphPart = {
	type: ParagraphPartType.INLINE_COMPONENT,
	value: new ParagraphInlineComponent(Todo, [])
};
