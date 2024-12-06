<script>
import Graph from './graph.svelte';
import MSTHover from './mst-hover.svelte';
</script>

## Graphs

A graph is an abstraction representing some objects and connections between pairs of objects. In its simplest form, a graph has just two pieces:
- A set of vertices $V$, representing the objects we are interested in. These could represent, for instance, people, physical locations, webpages, or even other graphs.
- A set of edges $E$, consisting of pairs of the form $(v_i, v_j)$, representing a connection between vertices. These could represent, for instance, relationships between people, roads between physical locations, links between webpages, or isomorphisms between graphs.

More generally, a graph contains information about what pairs of objects are related to each other in some way. 

## Breadth-first Search

<Graph searchType={"breadth"}/>

## Depth-first Search

<Graph searchType={"depth"}/>

## Dijkstra's Shortest Path

<Graph searchType={"shortest"}/>

## Prim's Minimum Spanning Tree

<Graph searchType={"mst"}/>

## Minimum Bottleneck Tree

<Graph searchType={"maxst"}/>

## MST Lemma

**Theorem (The Minimum Spanning Tree Lemma).** Suppose $T$ is a minimum spanning tree of a graph $G$. Let $e$ be an edge in $G \setminus T$. Then the following are true:
- $T \cup \{e\}$ contains a unique cycle $C$.
- Let $e' \in C$. Then $T^\prime = T - \{e\} \cup \{e'\}$ is a spanning tree of $G$.
- If $w(e') \leq w(e)$, then $w(T') \leq w(T)$. 

_Proof._ 
- Since $T$ is a spanning tree, there is exactly one path between any two vertices. Let's define $v_i$ and $v_j$ as the two nodes $e$ connects; that is, $e = (v_i, v_j)$. Now, let $p$ be the path between $v_i$ and $v_j$. We can make a cycle $C$ by simply adding the edge $(v_j, v_i)$ to this path -- this is a path from $v_i$ to itself!

<MSTHover />

- We removed an edge and added a different one, so $T'$ has the same number of edges. Therefore, it suffices to show that $T'$ is still a tree, since any tree with $n - 1$ edges is a spanning tree. So, we need to show that our new graph has no cycles.