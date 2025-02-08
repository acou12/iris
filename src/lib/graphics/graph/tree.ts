export interface Tree<V> {
	getRoot(): V;
	getChildren(v: V): V[];
	addChild(v: V, child: V);
	remove(v: V);
	getSubtreeSize(v: V): number;
}
