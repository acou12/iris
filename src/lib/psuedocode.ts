export class LaTeXMath {
	constructor(private math: string) {}

	render(): string {
		return this.math;
	}
}

export class IfStatement {
	constructor(private condition: LaTeXMath, private body: Block) {}

	render(depth: number): RenderedLine[] {
		return [
			{ depth, math: `\\textbf{if }${this.condition.render()}\\textbf{ then}` },
			...this.body.render(depth + 1),
			{ depth, math: `\\textbf{end if}` }
		];
	}
}

export class WhileStatement {
	constructor(private condition: LaTeXMath, private body: Block) {}

	render(depth: number): RenderedLine[] {
		return [
			{ depth, math: `\\textbf{while }${this.condition.render()}\\textbf{ do}` },
			...this.body.render(depth + 1),
			{ depth, math: `\\textbf{end while}` }
		];
	}
}

export class ForStatement {
	constructor(private condition: LaTeXMath, private body: Block) {}

	render(depth: number): RenderedLine[] {
		return [
			{ depth, math: `\\textbf{for }${this.condition.render()}\\textbf{ do}` },
			...this.body.render(depth + 1),
			{ depth, math: `\\textbf{end for}` }
		];
	}
}

export class GeneralStatement {
	constructor(private math: LaTeXMath) {}

	render(depth: number): RenderedLine[] {
		return [{ depth, math: this.math.render() }];
	}
}

export class Block {
	constructor(private lines: Line[]) {}

	render(depth: number): RenderedLine[] {
		return this.lines.flatMap((line) => line.statement.render(depth));
	}
}

export enum StatementType {
	IF,
	WHILE,
	FOR,
	GENERAL
}

export type Line =
	| {
			type: StatementType.IF;
			statement: IfStatement;
	  }
	| {
			type: StatementType.WHILE;
			statement: WhileStatement;
	  }
	| {
			type: StatementType.FOR;
			statement: ForStatement;
	  }
	| {
			type: StatementType.GENERAL;
			statement: GeneralStatement;
	  };

export class LaTeXFunction {
	constructor(
		private functionName: LaTeXMath,
		private parameters: LaTeXMath[],
		private body: Block
	) {}

	render(depth: number): RenderedLine[] {
		return [
			{
				depth,
				math: `\\textbf{function }\\text{${this.functionName.render()}}(${this.parameters
					.map((p) => p.render())
					.join(', ')})`
			},
			...this.body.render(depth + 1),
			{
				depth,
				math: `\\textbf{end function}`
			}
		];
	}
}

export type RenderedLine = {
	depth: number;
	math: string;
};

export const renderedLinesToLaTeX = (lines: RenderedLine[]): string => {
	return `\\begin{equation*}\\begin{split} ${lines
		.map((line) => `&` + `\\quad`.repeat(3 * line.depth) + ` ` + line.math)
		.join(' \\\\ ')} \\end{split}\\end{equation*}`;
};

export const math = (s: string) => new LaTeXMath(s);

export const func = (name: string, params: string[], lines: Line[]) =>
	new LaTeXFunction(math(name), params.map(math), new Block(lines));

export const ifs = (cond: string, lines: Line[]): Line => ({
	type: StatementType.IF,
	statement: new IfStatement(math(cond), new Block(lines))
});

export const whiles = (cond: string, lines: Line[]): Line => ({
	type: StatementType.WHILE,
	statement: new WhileStatement(math(cond), new Block(lines))
});

export const fors = (cond: string, lines: Line[]): Line => ({
	type: StatementType.FOR,
	statement: new ForStatement(math(cond), new Block(lines))
});

export const generals = (parts: string[]): Line => {
	return {
		type: StatementType.GENERAL,
		statement: new GeneralStatement(
			math(parts.map((x, index) => (index % 2 == 0 ? x : `\\text{${x}}`)).join(``))
		)
	};
};
