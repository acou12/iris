import { LaTeXFunction } from '$lib/psuedocode';

type Svelte = typeof import('*.md').default;

export class Article {
	constructor(public title: string, public elements: ArticleElement[]) {}
}
export const article = (
	title: string,
	elements: (managers: { figMan: FigureManager; algMan: AlgorithmManager }) => ArticleElement[]
): StructuredArticle => {
	const figMan = new FigureManager();
	const algMan = new AlgorithmManager();
	return convertToStructured(new Article(title, elements({ figMan, algMan })));
};

export enum ArticleElementType {
	HEADER,
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
	constructor(public text: string, public level: number) {}
}
export const h1 = (text: string): ArticleElement => ({
	type: ArticleElementType.HEADER,
	value: new Header(text, 0)
});

export const h2 = (text: string): ArticleElement => ({
	type: ArticleElementType.HEADER,
	value: new Header(text, 1)
});

export const h3 = (text: string): ArticleElement => ({
	type: ArticleElementType.HEADER,
	value: new Header(text, 2)
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
	constructor(
		public ref: FigureReference,
		public svelteComponent: SvelteComponent,
		public caption: string
	) {}
}

export const fig = (
	ref: FigureReference,
	svelteComponent: Svelte,
	caption: string
): ArticleElement => ({
	type: ArticleElementType.FIGURE,
	value: new Figure(ref, new SvelteComponent(svelteComponent), caption)
});

export class ArticleAlgorithm {
	constructor(public ref: AlgorithmReference, public alg: LaTeXFunction, public caption: string) {}
}

export const alg = (
	ref: AlgorithmReference,
	func: LaTeXFunction,
	caption: string
): ArticleElement => ({
	type: ArticleElementType.ALGORITHM,
	value: new ArticleAlgorithm(ref, func, caption)
});

export class SvelteComponent {
	constructor(public svelte: Svelte) {}
}

export class DropdownSection {
	constructor(public title: string, public elements: ArticleElement[]) {}
}

export class FigureManager {
	newFigure(code: string) {
		return new FigureReference(code);
	}
}

export class FigureReference {
	constructor(public code: string) {}
}

export class AlgorithmManager {
	newAlgorithm(code: string) {
		return new AlgorithmReference(code);
	}
}

export class AlgorithmReference {
	constructor(public code: string) {}
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

/*









*/
/* structured representation */

const convertToStructured = (article: Article): StructuredArticle => {
	const figOrder: Map<string, number> = new Map();
	let currentFig = 0;

	const algOrder: Map<string, number> = new Map();
	let currentAlg = 0;

	const parseElements = (elements: ArticleElement[]): SturcturedArticleElement[] => {
		const parseElement = (startIndex: number): [SturcturedArticleElement, number] => {
			const first = elements[startIndex];
			switch (first.type) {
				case ArticleElementType.HEADER: {
					const [section, endIndex] = parseSection(first.value, startIndex + 1);
					return [
						{
							type: StructuredArticleElementType.SECTION,
							value: section
						},
						endIndex
					];
				}
				case ArticleElementType.PARAGRAPH: {
					return [
						{
							type: StructuredArticleElementType.PARAGRAPH,
							value: new StructuredParagraph(first.value)
						},
						startIndex + 1
					];
				}
				case ArticleElementType.LIST: {
					return [
						{
							type: StructuredArticleElementType.LIST,
							value: new StructuredList(first.value)
						},
						startIndex + 1
					];
				}

				case ArticleElementType.BLOCK_MATH: {
					return [
						{
							type: StructuredArticleElementType.BLOCK_MATH,
							value: new StructuredBlockMath(first.value)
						},
						startIndex + 1
					];
				}

				case ArticleElementType.FIGURE: {
					figOrder.set(first.value.ref.code, currentFig);
					currentFig++;
					return [
						{
							type: StructuredArticleElementType.FIGURE,
							value: new StructuredFigure(
								first.value.svelteComponent,
								currentFig.toString(),
								first.value.caption
							)
						},
						startIndex + 1
					];
				}
				case ArticleElementType.ALGORITHM: {
					algOrder.set(first.value.ref.code, currentAlg);
					currentAlg++;
					return [
						{
							type: StructuredArticleElementType.ALGORITHM,
							value: new StructuredAlgorithm(
								first.value.alg,
								currentAlg.toString(),
								first.value.caption
							)
						},
						startIndex + 1
					];
				}
				case ArticleElementType.DROPDOWN_SECTION: {
					return [
						{
							type: StructuredArticleElementType.DROPDOWN_SECTION,
							value: new StructuredDropdownSection(
								first.value.title,
								parseElements(first.value.elements)
							)
						},
						startIndex + 1
					];
				}
			}
		};

		const parseSection = (header: Header, startIndex: number): [StructuredSection, number] => {
			const children: SturcturedArticleElement[] = [];
			let index = startIndex;
			while (
				!(
					index >= elements.length ||
					(elements[index].type === ArticleElementType.HEADER &&
						(elements[index].value as Header).level <= header.level)
				)
			) {
				const [el, newIndex] = parseElement(index);
				index = newIndex;
				children.push(el);
			}
			const section = new StructuredSection(header.level, header.text, children);
			return [section, index];
		};

		const resultElements: SturcturedArticleElement[] = [];

		let index = 0;
		while (index < elements.length) {
			const [el, newIndex] = parseElement(index);
			index = newIndex;
			resultElements.push(el);
		}

		return resultElements;
	};

	return new StructuredArticle(article.title, parseElements(article.elements));
};

export class StructuredArticle {
	constructor(public title: string, public elements: SturcturedArticleElement[]) {}
}

export type SturcturedArticleElement =
	| {
			type: StructuredArticleElementType.SECTION;
			value: StructuredSection;
	  }
	| {
			type: StructuredArticleElementType.PARAGRAPH;
			value: StructuredParagraph;
	  }
	| {
			type: StructuredArticleElementType.LIST;
			value: StructuredList;
	  }
	| {
			type: StructuredArticleElementType.BLOCK_MATH;
			value: StructuredBlockMath;
	  }
	| {
			type: StructuredArticleElementType.FIGURE;
			value: StructuredFigure;
	  }
	| {
			type: StructuredArticleElementType.ALGORITHM;
			value: StructuredAlgorithm;
	  }
	| {
			type: StructuredArticleElementType.DROPDOWN_SECTION;
			value: StructuredDropdownSection;
	  }
	| {
			type: StructuredArticleElementType.SVELTE_COMPONENT;
			value: StructuredSvelteComponent;
	  };

export enum StructuredArticleElementType {
	SECTION,
	DROPDOWN_SECTION,
	PARAGRAPH,
	LIST,
	BLOCK_MATH,
	FIGURE,
	ALGORITHM,
	SVELTE_COMPONENT
}

export class StructuredSection {
	constructor(
		public sectionType: number,
		public sectionText: string,
		public children: SturcturedArticleElement[]
	) {}
}

export class StructuredParagraph {
	constructor(public paragraph: Paragraph) {}
}

export class StructuredList {
	constructor(public list: List) {}
}

export class StructuredBlockMath {
	constructor(public blockMath: BlockMath) {}
}

export class StructuredFigure {
	constructor(public svelteComponent: SvelteComponent, public id: string, public caption: string) {}
}

export class StructuredAlgorithm {
	constructor(public alg: LaTeXFunction, public id: string, public caption: string) {}
}

export class StructuredDropdownSection {
	constructor(public title: string, public elements: SturcturedArticleElement[]) {}
}

export class StructuredSvelteComponent {
	constructor(public svelteComponent: SvelteComponent) {}
}
