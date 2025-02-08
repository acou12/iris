import { Tree } from './tree';

class StandardTree<V> implements Tree<V> {
	root: V;
	vertices: Set<V>;
	childMap: Map<V, Set<V>>;
	parentMap: Map<V, V>;
	sizeMap: Map<V, number>;

	constructor(root: V) {
		this.root = root;
		this.vertices = new Set();
		this.childMap = new Map();
		this.parentMap = new Map();
		this.sizeMap = new Map();

		this.childMap.set(root, new Set());
		this.parentMap.set(root, undefined);
		this.sizeMap.set(root, 1);
	}

	getRoot(): V {
		return this.root;
	}

	getVertices(): Set<V> {
		return this.vertices;
	}

	getChildren(v: V): Set<V> {
		return this.childMap.get(v);
	}

	addChild(parent: V, child: V) {
		this.childMap.get(parent).add(child);
		this.childMap.set(child, new Set());
		this.parentMap.set(child, parent);
	}

	remove(v: V) {
		this.vertices.delete(v);
		this.childMap.delete(v);
		this.parentMap.delete(v);
		this.sizeMap.delete(v);
	}

	getSubtreeSize(v: V): number {
		return this.sizeMap.get(v);
	}
}
