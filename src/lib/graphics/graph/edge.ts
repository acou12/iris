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

	identical(other: Edge<V>) {
		return (
			(this.from == other.from && this.to == other.to) ||
			(this.from == other.to && this.to == other.from)
		);
	}
}
