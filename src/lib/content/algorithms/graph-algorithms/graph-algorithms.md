<script>
import Graph from './graph.svelte';
import MSTHover from './mst-hover.svelte';
</script>

# Introduction

A **graph** is an abstraction representing some objects and connections between pairs of objects. In its simplest form, a graph has just two pieces:

- A set of vertices $V$, representing the objects we are interested in. These could represent, for instance, people, physical locations, webpages, or even other graphs.
- A set of edges $E$, consisting of pairs of the form $(v_i, v_j)$, representing a connection between vertices. These could represent, for instance, relationships between people, roads between physical locations, links between webpages, or isomorphisms between graphs.

More generally, a graph contains information about what pairs of objects are related to each other in some way.

Let us first define some terminology that will make talking about graphs less cumbersome. If $G$ has an edge $e = (u, v)$, we say $u$ and $v$ are **adjacent**. We also say $u$ is a neighbor of $v$ and $v$ is a neighbor of $u$. The edge $e$ is also referred to as being **incident** on $u$ (and $v$, as well).

The **degree** of a node $v$ (denoted $\text{deg}(v)$) is the number of other nodes adjacent to it, or in other words, the number of neighbors it has. Equivalently, $\text{deg}(v)$ is the number of edges incident on $v$.

We define a **path** as a sequence of nodes such that any two adjacent nodes in the sequence are adjacent in $G$. Two nodes $u$ and $v$ are then **reachable** from each other if there is a path that starts at $u$ and ends at $v$ (or vice versa).

As with most sufficiently complex mathematical notions, there is an [infinite black hole](https://en.wikipedia.org/wiki/Glossary_of_graph_theory) of graph theory terminology, much of which we will see in the future. For now, however, these terms are sufficient for making basic claims about graphs. The following is one of the most important facts about graphs, especially for the purpose of runtime analysis.

**The Handshaking Lemma.** For any graph $G$, the sum of the degrees of every node is twice the number of edges. That is,

$$
\sum_{v \in E} \text{deg}(v) = 2|E|
$$

_Intuition._ It is more useful to consider the edge-incidence definition of degree here. First, observe that every edge is incident on exactly two vertices. Thus, in our sum of degrees, any given edge contributes to exactly two $\text{deg}(v)$ terms by 1. Therefore, we would expect this sum to be equal to twice the number of edges.

_Proof._ We can actually formalize this intuitive idea of "contribution." (do that)

# Representations

We have discussed the mathematical idea of a graph, but it remains to define the abstract data type for use in our code:

| Operation          | Description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| Vertex iteration   | Iterate over every vertex $v \in V$.                                       |
| Edge iteration     | Iterate over every edge $e \in E$.                                         |
| Edge detection     | For two vertices $u$ and $v$, determine whether $(u, v) \in E$.            |
| Neighbor iteration | For some specified $u$, iterate over every $v \in V$ where $(u, v) \in E$. |

There are two common ways of implementing this data type.

## Adjacency Matrix

One way to interpret a graph is that it is simply a binary relation on the vertices -- that is, any two vertices are either adjacent or they aren't adjacent. This leads to a natural programmatic representation -- for every pair of vertices, keep track of whether they are adjacent or not. We can use any data type that acts as a two-place boolean predicate, but the most obvious choice is a two dimensional array. True to relation interpretation, we could use a two-dimensional boolean array, but for reasons that will make sense later, it is more typical to use an integer array and store a $1$ for adjacency and $0$ for non-adjacency. This array is known as an **adjacency matrix**.

## Adjacency List

# Searching

So far, we have only answered local questions about graphs:

- What are the neighbors of $v$?
- Are $u$ and $v$ adjacent?

But not yet questions which answer higher level, global properties of graphs. Here is an example:

**The reachability problem:** Given a graph $G$ and two vertices $u$ and $v$, determine whether there is a path between $u$ and $v$ using edges in $G$.

It is easy to see why this is a practically useful problem to have a solution for.

- If your graph represents a set of locations and roadways between them, this problem asks whether there is a (literal, physical) path between two locations.
- If your graph represents a social network (with vertices as people and edges as personal connections), this problem asks whether there is a line of connections between two people -- this would tell you, for instance, whether a rumor could spread between these two people just by word of mouth.
- If your graph represents states and transitions between them, this problem asks whether there is a way to get from one state to another only through transitions.

The most common way to solve the reachability problem is with a **searching algorithm**. At a very high level, here is how pretty much _every_ search algorithm works:

- Maintain a set of nodes which we have **visited**.
- Iterate until we have visited every node:
  - Choose a node we have not visited that is adjacent to a node we have visited.
  - If this node is our destination, terminate and report true. Otherwise, mark this node as visited.
- If we have visited every node without finding our destination, report false.

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
