export class Edge<V> {
	constructor(private from: V, private to: V) {}

	getFrom(): V {
		return this.from;
	}

	getTo(): V {
		return this.to;
	}

	reversed(): Edge<V> {
		return new Edge(this.to, this.from);
	}

	toString(): string {
		return `${this.from},${this.to}`;
	}
}
