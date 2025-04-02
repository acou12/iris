<script>
import Graph from './graph.svelte';
import AdjMatrix from './representation/adj-matrix/adj-matrix.svelte';
import AdjList from './representation/adj-list/adj-list.svelte';
import MSTHover from './mst-hover.svelte';
import GraphSearchStepwise from './graph-search-stepwise.svelte';
import Dropdown from '$lib/components/article/Dropdown.svelte'
import Todo from '$lib/components/article/Todo.svelte'
import Figure from '$lib/figure/Figure.svelte'
import Algorithm from '$lib/figure/Algorithm.svelte'
import FigureLink from '$lib/figure/FigureLink.svelte'
import AlgorithmLink from '$lib/figure/AlgorithmLink.svelte'
import PsuedocodeTest from '$lib/components/PsuedocodeTest.svelte'
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
\sum_{v \in V} \text{deg}(v) = 2|E|
$$

_Intuition._ It is more useful to consider the edge-incidence definition of degree here. First, observe that every edge is incident on exactly two vertices. Thus, in our sum of degrees, any given edge contributes to exactly two $\text{deg}(v)$ terms by 1. Therefore, we would expect this sum to be equal to twice the number of edges.

_Proof._ We can formalize this intuitive idea. <Todo/>

# Representations

We have discussed the mathematical idea of a graph, but it remains to define the abstract data type for use in our code:

| Operation          | Description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| Vertex iteration   | Iterate over every vertex $v \in V$.                                       |
| Edge iteration     | Iterate over every edge $e \in E$.                                         |
| Edge detection     | For two vertices $u$ and $v$, determine whether $(u, v) \in E$.            |
| Neighbor iteration | For some specified $u$, iterate over every $v \in V$ where $(u, v) \in E$. |

There are two common ways of implementing this data type.

## Adjacency List

The most common way of representing a graph is by associating each vertex with a list of its neighbors, as shown in Figure 2.

<Figure id={`2`} name={`adj-list`} 
        caption={`A graph (left) and its adjacency list representation (right). Hover over vertices
                  to see their corresponding list in the map.`}>
  <AdjList/>
</Figure>

## Adjacency Matrix

One way to interpret a graph is that it is simply a binary relation on the vertices -- that is, any two vertices are either adjacent or they aren't adjacent. This leads to a natural programmatic representation -- for every pair of vertices, keep track of whether they are adjacent or not. We can use any data type that acts as a two-place boolean predicate, but the most obvious choice is a two dimensional array. True to the relation interpretation, we could use a two-dimensional boolean array, but for reasons that will make sense later, it is more typical to use an integer array and store a $1$ for adjacency and $0$ for non-adjacency. This array is known as an **adjacency matrix**.

<Figure id={`3`} name={`adj-matrix`} 
        caption={`A graph (left) and its adjacency matrix representation (right). Hover over vertices
                  to see their corresponding row and column in the matrix.`}>
  <AdjMatrix/>
</Figure>

Adjacency matrices perform one operation _very_ quickly: to detect whether two vertices are connected by an edge, we can simply test whether the adjacency matrix has a 1 in the corresponding position. This can be done with (approximately) two pointer deferences, so this operation takes $\Theta(1)$ time.

Unfortunately, unlike the case of the adjacency list, we can no longer quickly find neighbors. The adjacency matrix in <FigureLink id=3 name="adj-matrix"/> demonstrates this. For a vertex $v_i$, we have no choice but to search the entire $i$-th row (or column) and check which entries have value 1. Neighbor iteration, thus, takes $\Theta(n)$. For the worst possible graphs, this is no worse than an adjacency list (since the degree of every vertex might be in $\Theta(n)$), but many graphs have much fewer edges than the worst case. A graph is called **sparse** if its number of edges is small compared to the maximum possible. It is **dense** if its number of edges is closer to the maximum. Graphs that are sparse typically benefit a lot from the adjacency list representation, since vertex degrees are small compared to the number of vertices.

<Dropdown title={`Tangent: Walk Counting`}>

Adjacency matrices have a couple of fringe applications that make use of matrix operations. One of the simplest examples of this is counting the number of walks between pairs of vertices. A **walk** is a sequence of vertices in a graph such that every pair of adjacent vertices in the sequence are connected by an edge. Note that the only difference between this definition and that of a path is that a path must contain unique vertices. A walk, on the other hand, can repeat vertices an arbitrary number of times. It turns out that there is a very simple algorithm to count the number of walks between _every pair of vertices_ if $G$ is represented as an adjacency matrix. In the following, we will use $G$ to refer to the graph as well as its adjacency matrix representation.

**Lemma.** Let $W = G^k$, where $G$ is the adjacency matrix of a graph and $k$ is a positive integer and let $v_i$ and $v_j$ be arbitrary vertices in $G$. Then $W_{ij}$ is the number of walks that start at $v_i$ and end at $v_j$ of length $k$.

_Proof._ We proceed by induction in $k$.

**Base case:** Consider walks of length 1. Every possible walk of length 1 must start at $v_i$ and end at $v_j$ (by definition) -- therefore, the walk $\langle v_i, v_j \rangle$ is the only possible walk of length 1. This is only a valid walk if $(v_i, v_j) \in E$. Therefore, $G_{ij} = 1$ if and only if $W_{ij} = 1$, and so $W = G = G^1$.

**Inductive step:** Suppose $W = G^k$ correctly represents the number of walks between all pairs of vertices in $G$. <Todo />

<!-- CONISDERATION: It might make sense to write about fast matrix multiplication independently somewhere else and reference it here to make this section more self-contained. -->

We can compute this power by repeatedly multiplying $G$ by itself. Each of the $k - 1$ multiplications take $\Theta(n^3)$ time, so the algorithm takes $\Theta(n^3k)$ time. We can speed this up by using the same trick we used to speed up integer exponentiation. Since matrix multiplication is associative, we can rewrite $W$ as the product of two matrices with (approximately) half the number of multplications. If $k$ is even, we can rewrite $W$ as

$$
W = G^k = (G^{k/2})(G^{k/2})
$$

If $k$ is odd,

$$
W = G^k = (G^{\lfloor k/2 \rfloor})(G^{\lfloor k/2 \rfloor})G
$$

Either way, we can recursively compute $G^{\lfloor k/2 \rfloor}$ and perform a constant number of matrix multiplications, which each take $\Theta(n^3)$ time. Therefore, this algorithm has the recurrence

$$
T(k) = cn^3 + 2T(k/2)
$$

Note that $k$ varies in our recursive calls, but $n$ always stays the same. Using familiar techniques, we can show that $T(n) \in \Theta(n^3\log k)$, which is a massive improvement. The main point is that by interpreting our graph as a familiar mathematical object (a matrix), we were able to reduce our problem of counting walks to a more familiar problem of matrix exponentiation, which we know how to do efficiently.

<Dropdown title={`Application: Random Walk Distributions`}>

Our walk-counting algorithm allows us to answer some very interesting combinatorial questions about graphs. Here's one example: a **random walk** is defined as a walk on a graph where each next node in the sequence is chosen uniformly randomly from the neighbors of the previous node. If we start at some vertex $v_i$ and take a random walk with $k$ steps, what is the probability that we end up at $v_i$ again? To compute this probability, we can compute the total number of walks from $v_i$ to itself and divide that by the total number of walks from $v_i$, or

$$
P = { W_{ii} \over \sum_{j=0}^{n} W_{ij} }
$$

More generally, this gives us a discrete probability distribution of where we end up after a $k$-step random walk starting at $v_i$:

$$
F(v_j) = { W_{ij} \over \sum_{j=0}^{n} W_{ij} }
$$

This is very closely related to a concept known as **markov chain process** which we will (eventually) discuss later.

<!-- Are there any interesting applications of this? -->

</Dropdown>

</Dropdown>

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

The most common way to solve the reachability problem is with a **searching algorithm**. There are many different ways to search a graph, but almost all of them are basic variations of the following high level algorithm.

As it turns out, it's not much harder to solve a more general problem: _which vertices are reachable from $u$?_ This is the problem searching algorithms actually solve. Here's how: starting at $u$, we begin building a set $X$ of e**x**plored vertices, which we know for sure are reachable from $u$. We repeatedly expand $X$ by finding vertices which are connected to already explored vertices. Eventually, we run out of vertices to add, and we stop -- at this point, $X$ contains all of the vertices reachable from $u$!

Let's try to describe this in a way that is a little closer to an actual algorithm. Let's say a vertex $v$ is a **fringe** vertex if $v \not\in X$, but $(u, v) \in E$ for some $u \in X$. Basically, $v$ is a fringe vertex if it hasn't been explored, but it is one edge away from a vertex that has been explored. Then our algorithm should repeatedly find a fringe vertex and add it to $X$. <AlgorithmLink id=1 name="search-algorithm"/> summarizes this approach, and <FigureLink id=4 name="graph-search-stepwise"/> visualizes the idea.

<Algorithm id={`1`} name={`search-algorithm`} caption={`A high level overview of searching using a fringe.`}>
<PsuedocodeTest/>
</Algorithm>

<Figure id={`4`} name={`graph-search-stepwise`}
        caption={`A visualization of the high level graph search algorith. Orange vertices are those that are one edge away from the explored set. Click an edge to add it and its fringe vertex to the explored set.`}>
<GraphSearchStepwise />
</Figure>

We have left out a lot of details here, but let's first prove that this high-level algorithm accomplishes our goal before we try to flesh it out.

**Theorem.** After <AlgorithmLink id=1 name="search-algorithm"/> terminates, $X$ contains exactly the vertices in $G$ which are reachable from $u$.

Let's first prove the following invariant: _all vertices in $X$ are reachable from $u$ _.This certainly holds before the loop starts ($u$ is reachable from itself), so we just need to show that it holds after each iteration of the loop. We need to show that the new element we've added to $X$, the fringe vertex $v$, is reachable from $u$. By definition of fringe vertex, there is some $w \in X$ such that $(w, v) \in E$. By the invariant, $w$ is reachable from $u$, and so there is some path

$$
p = \langle u, p_1, \dots, p_{n-1}, w \rangle
$$

If we construct a new path by simply appending the edge $(w, v)$, we get the path

$$
p' = \langle u, p_1, \dots, p_{n-1}, w, v \rangle
$$

and so $v$ is reachable from $u$. Thus, the invariant is preserved.

So, when the algorithm terminates, $X$ contains only vertices rachable from $u$. Aren't we done, then? Not quite. We have shown that if a vertex is in $X$, it is reachable from $u$, but we still need to show that if a vertex is reachable from $u$, it is in $X$. Essentially, thus far we have only shown that $X$ is a subset of the vertices reachable from $u$, but we need to show it is equal.

This direction is slightly more involved. What we want to show is that... <Todo/>

So we've shown that the algorithm correctly finds all of the vertices we need to find. However, we haven't specified completely how we even find fringe vertices in the first place. Until we do that, we can't even implement this algorithm, let alone analyze its runtime.

<Todo/>

<!-- - $X \gets \{ v_s \}$
- **while** FindFringe(G, X) $\neq$ NIL
  - $(x, u) \gets$ FindFringe(G, X)
  - $X \gets X \cup \{ u \}$

There are at most $n$ iterations (in the case we add all vertices to $X$), and FindFringe takes $\Theta(m)$ time, so the entire algorithm takes $\Theta(nm)$ time.

But every iteration, we're only adding _one vertex_ to $X$, so the fringe is not changing dramatically. It seems like we're wasting a lot of time by checking all of the edges every time when most of them haven't changed to or from being fringe edges. Indeed, we can do much better than this. -->

## Breadth-first Search

<Figure id={`5`} name={`breadth-first-search`}
        caption={`A demonstration of breadth first search. Click to advance one iteration.`}>
  <Graph/>
</Figure>

## Depth-first Search

<Todo/>

## Path Reconstruction

<Todo/>

## Minimum Spanning Trees

**Theorem (The Minimum Spanning Tree Lemma).** Suppose $T$ is a minimum spanning tree of a graph $G$. Let $e$ be an edge in $G \setminus T$. Then the following are true:

- $T \cup \{e\}$ contains a unique cycle $C$.
- Let $e' \in C$. Then $T^\prime = T - \{e\} \cup \{e'\}$ is a spanning tree of $G$.
- If $w(e') \leq w(e)$, then $w(T') \leq w(T)$.

<Figure id={`6`} name={`spanning-tree-cycles`}
        caption={`A spanning tree of a graph. Hover over a non-tree edge to reveal the cycle
                  guaranteed by the minimum spanning tree lemma.`}>
  <MSTHover />
</Figure>

<!-- _Proof._

- Since $T$ is a spanning tree, there is exactly one path between any two vertices. Let's define $v_i$ and $v_j$ as the two nodes $e$ connects; that is, $e = (v_i, v_j)$. Now, let $p$ be the path between $v_i$ and $v_j$. We can make a cycle $C$ by simply adding the edge $(v_j, v_i)$ to this path -- this is a path from $v_i$ to itself! -->

<!-- - We removed an edge and added a different one, so $T'$ has the same number of edges. Therefore, it suffices to show that $T'$ is still a tree, since any tree with $n - 1$ edges is a spanning tree. So, we need to show that our new graph has no cycles. -->

<!-- <PsuedocodeTest /> -->
