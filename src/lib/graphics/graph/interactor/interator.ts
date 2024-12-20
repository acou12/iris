/**
 * A graph interactor is used to detect user
 * interaction with an animated graph -- more
 * specifically, hover and click events of nodes and edges.
 *
 * A node is being hovered over if the user's mouse is entirely
 * contained in the node. An edge hover is more complicated
 * and is left unspecified... but basically if the mouse
 * is over the edge line within some reasonable margin.
 *
 * A "click" event occurs when one of the mouse buttons is pressed
 * while an element is hovered over.
 */
export interface GraphInteractor<V> {
	/**
	 * @returns a vertex that is being hovered over.
	 *          if there are multiple options, one is
	 *          chosen arbitrarily. if there are none,
	 *          undefined is returned.
	 */
	getHoverVertex(): V | undefined;

	/**
	 * @returns an edge that is being hovered over.
	 *          if there are multiple options, one is
	 *          chosen arbitrarily. if there are none,
	 *          undefined is returned.
	 */
	getHoverEdge(): [V, V] | undefined;

	/**
	 * sets up a vertex click handler. when a vertex is clicked,
	 * `handle` is called with that vertex.
	 */
	handleClickVertex(handle: (v: V) => void): void;

	/**
	 * sets up an edge click handler. when an edge is clicked,
	 * `handle` is called with that edge.
	 */
	handleClickEdge(handle: (e: [V, V]) => void): void;

	update(delta: number): void;
}
