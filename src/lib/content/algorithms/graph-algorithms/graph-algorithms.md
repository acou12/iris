<script>
import { graphSearch, breadthFirstSearch } from './psuedocode'
import { dijkstrasSearch } from '../greedy-graph-algorithms/psuedocode'
import Graph from './graph.svelte';
import AdjMatrix from './representation/adj-matrix/adj-matrix.svelte';
import AdjList from './representation/adj-list/adj-list.svelte';
import Definitions from './definitions/definitions.svelte';
import GraphSearchStepwise from './graph-search-stepwise.svelte';
import MSTHover from '../greedy-graph-algorithms/mst-hover.svelte';
import Shortest from '../greedy-graph-algorithms/shortest.svelte';
import Dropdown from '$lib/components/article/Dropdown.svelte'
import Todo from '$lib/components/article/Todo.svelte'
import Figure from '$lib/figure/Figure.svelte'
import Algorithm from '$lib/figure/Algorithm.svelte'
import FigureLink from '$lib/figure/FigureLink.svelte'
import AlgorithmLink from '$lib/figure/AlgorithmLink.svelte'
import Psuedocode from '$lib/components/Psuedocode.svelte'
</script>

# Introduction

# Definitions

Formally, a **graph** is an abstraction representing some objects and connections between pairs of objects. In its simplest form, a graph has just two pieces:

- A set of **vertices** $V$, representing the objects we are interested in. Vertices can also be called **nodes**, points, junctions, pins, knobs... this text will keep standard computer science convention by using the terms **vertex** and **node** interchangably, in no way that is internally consistent.
- A set of **edges** $E$, consisting of pairs of the form $(v_i, v_j)$, representing a connection between the vertices $v_i$ and $v_j$. Edges can also be called arcs, lines, branches, connectors, strands, nerves... this text will use the term **edge**. Depending on whether a graph is **directed** or **undirected**, edges may be one-directional or bidirectional (respectively). For now, we will assume graphs are undirected, but we will discuss directed graphs later, and little modification is typically needed to make algorithms and graph representations work with directed graphs.

If $G$ has an edge $e = (u, v)$, we say $u$ and $v$ are **adjacent**. We also say $u$ is a **neighbor** of $v$ and $v$ is a neighbor of $u$. The edge $e$ is also referred to as being **incident** on $u$ (and $v$, as well). The **degree** of a node $v$ (denoted $\text{deg}(v)$) is the number of other nodes adjacent to it, or in other words, the number of neighbors it has. Equivalently, $\text{deg}(v)$ is the number of edges incident on $v$.

We define a **walk** as a sequence of nodes such that any two adjacent nodes in the sequence are adjacent in $G$. A walk is called a **path** if it consists of distinct vertices -- that is, it doesn't go over any vertex more than once. Two vertices $u$ and $v$ are then **reachable** from each other if there is a path (or walk) that starts at $u$ and ends at $v$ (or vice versa).

A graph can also be **weighted**. In a weighted graph, we assign a value (usually, a real number) to every edge. To denote weights, we will assume there exists a function $w: V \to \mathbb{R}$, defined such that $w(e)$ is the weight assigned to the edge $e$. We can also talk about the total weight of a walk (or path), defined as the sum of the weights of each edge in the walk (or path).

<Definitions/>

As with most sufficiently complex mathematical notions, graph theory terminology is an [all-consuming black hole](https://en.wikipedia.org/wiki/Glossary_of_graph_theory), and we have only covered a small fraction of all of the words one can use to describe graphs and their parts and properties. However, these terms are sufficient for establishing some basic claims about graphs, which the next section will do.

# Properties

A graph is the first data structures that we have come across which has two separate, semi-independent sizes: the number of nodes and the number of edges. It is possible for a graph to have a large number of nodes, but not many edges, or vice versa; furthermore, edges can be clustered in certain parts of the graphs, such that the degree of one node is much larger than another. These facts slightly complicate our desire to determine the runtime complexity of graph algorithms. It may seem like an algorithm that operates on many nodes and their neighbors would have a runtime expressed only through some complicated combination of sums. As it turns out, however, it is possible to use some bounds to make this analysis easier.

The first important fact is that the number of edges can only be so large relative to the number of nodes. Imagine trying to fill in a graph with $n$ nodes with as many edges as possible. We can start at node $1$, connecting it to every other node, giving $n - 1$ edges. Then, we can connect node $2$ to every other edge. We have already added the edge $(1, 2)$ before, so we only get $n - 2$ more edges from this action. Continuing this until we have no more edges to add yields what is called a **complete graph**. The number of edges in this graph is

$$
\sum_{i=1}^{n} (n - i) = \sum_{j=0}^{n-1} j = \frac{n(n-1)}{2}
$$

Less precisely, but more importantly, **an $n$-node graph can have at most $\Theta(n^2)$ edges**. This allows us to upper bound certain quantities which contain both $V$ and $E$ in terms of just $E$, which can be useful if the precise edge structure of a graph is not known.

For instance, suppose a graph algorithm takes $\Theta(V^2 + E^2)$ time. Since $E$ can be as low as zero, the algorithm takes at least $\Omega(V^2)$ time, but from our upper bound, the algorithm takes at most $O(V^2 + V^4) = O(V^4)$ time.

Another common workflow when working with graphs is doing some operation on every neighbor of every node. As we mentioned, the degree is free to vary wildly throughout a graph, so it is useful to have a bound on the total sum of all of these degrees, which the next lemma provides.

**The Handshaking Lemma.** For any graph $G$, the sum of the degrees of every node is twice the number of edges. That is,

$$
\sum_{v \in V} \text{deg}(v) = 2|E|
$$

_Intuition._ It is more useful to consider the edge-incidence definition of degree here. First, observe that every edge is incident on exactly two vertices. Thus, in our sum of degrees, any given edge contributes to exactly two $\text{deg}(v)$ terms by 1. Therefore, we would expect this sum to be equal to twice the number of edges.

_Proof._ We can formalize this intuitive idea. Let $\delta_{ij} = 1$ if and only if $e_j$ is incident on vertex $v_i$; otherwise, it is defined as 0. So, we can now rewrite $\text{deg}(v_i) = \sum_{j=1}^{m} \delta_{ij}$. So, the sum of all of these degrees is

$$
\sum_{i=1}^{n} \sum_{j=1}^{m} \delta_{ij} = \sum_{j=1}^{m} \sum_{i=1}^{n} \delta_{ij} = \sum_{i=1}^{n} 2 = 2m
$$

Here we simply rearrange the sum and use the fact that there are exactly 2 vertices incident on any edge, so $\sum_{i=1}^{n} \delta_{ij} = 2$.

<Dropdown title={`Nomenclature: Handshaking`}>

If you were curious where the name **handshaking lemma** comes from: imagine a set of people at a computer science conference, simultaneously shaking hands with one another. The nodes in the graph represent the computer scientists and each edge represents a handshake between two people. The degree of a node, then, is the number of hands that that person has, and the lemma tells us that the total number of hands is equal to twice the number of handshakes, which makes sense, since a handshake involves two hands! You might be wondering how these people have so many hands. It is a fairly well-kept secret that after you receive a doctorate degree, you gain the ability to grow an arbitrary number of hands. This is something to look forward to if you plan on furthering your education.

</Dropdown>

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

One way to interpret a graph is that it is simply a binary relation on the vertices — that is, any two vertices are either adjacent or they aren't adjacent. This leads to a natural programmatic representation — for every pair of vertices, keep track of whether they are adjacent or not. We can use any data type that acts as a two-place boolean predicate, but the most obvious choice is a two dimensional array. True to the relation interpretation, we could use a two-dimensional boolean array, but for reasons that will make sense later, it is more typical to use an integer array and store a $1$ for adjacency and $0$ for non-adjacency. This array is known as an **adjacency matrix**.

<Figure id={`2`} name={`adj-matrix`} 
        caption={`A graph (left) and its adjacency matrix representation (right). Hover over vertices
                  to see their corresponding row and column in the matrix.`}>
  <AdjMatrix/>
</Figure>

Adjacency matrices perform one operation _very_ quickly: to detect whether two vertices are connected by an edge, we can simply test whether the adjacency matrix has a 1 in the corresponding position. This can be done with (approximately) two pointer deferences, so this operation takes $\Theta(1)$ time.

Let us investigate the other operations. To iterate over every neighbor of $v_i$, we can iterate through the $i$-th row and report all the entries which are 1. Since a row is size $n$, this always takes $\Theta(n)$ time. Similarly, to iterate over all edges, we can go through the entire matrix and return all of the entries with a 1 in them, taking $\Theta(n^2)$ time. As we will see, neither of these are particularly good — this is because we waste a lot of time iterating over entries which don't actually represent any edges, but are just empty placeholds for where edges _could_ be. The next representation, the adjacency list, addresses this issue.

<!-- Unfortunately, unlike the case of the adjacency list, we can no longer quickly find neighbors. The adjacency matrix in <FigureLink id=2 name="adj-matrix"/> demonstrates this. For a vertex $v_i$, we have no choice but to search the entire $i$-th row (or column) and check which entries have value 1. Neighbor iteration, thus, takes $\Theta(n)$. For the worst possible graphs, this is no worse than an adjacency list (since the degree of every vertex might be in $\Theta(n)$), but many graphs have much fewer edges than the worst case. A graph is called **sparse** if its number of edges is small compared to the maximum possible. It is **dense** if its number of edges is closer to the maximum. Graphs that are sparse typically benefit a lot from the adjacency list representation, since vertex degrees are small compared to the number of vertices. -->

<Dropdown title={`Tangent: Walk Counting`}>

Adjacency matrices have a couple of fringe applications that make use of matrix operations. One of the simplest examples of this is counting the number of walks between pairs of vertices. A **walk** is a sequence of vertices in a graph such that every pair of adjacent vertices in the sequence are connected by an edge. Note that the only difference between this definition and that of a path is that a path must contain unique vertices. A walk, on the other hand, can repeat vertices an arbitrary number of times. It turns out that there is a very simple algorithm to count the number of walks between _every pair of vertices_ if $G$ is represented as an adjacency matrix. In the following, we will use $G$ to refer to the graph as well as its adjacency matrix representation.

**Lemma.** Let $W = G^k$, where $G$ is the adjacency matrix of a graph and $k$ is a positive integer and let $v_i$ and $v_j$ be arbitrary vertices in $G$. Then $W_{ij}$ is the number of walks that start at $v_i$ and end at $v_j$ of length $k$.

_Proof._ We proceed by induction in $k$.

**Base case:** Consider walks of length 1. Every possible walk of length 1 must start at $v_i$ and end at $v_j$ (by definition) — therefore, the walk $\langle v_i, v_j \rangle$ is the only possible walk of length 1. This is only a valid walk if $(v_i, v_j) \in E$. Therefore, $G_{ij} = 1$ if and only if $W_{ij} = 1$, and so $W = G = G^1$.

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

</Dropdown>

<Dropdown title={`Bonus Exercises: Walk Counting`}>

1. A **triangle** in a graph is cycle of length three. Design an algorithm that determines the number of triangles in a graph $G$ using adjacency matrix multiplication.
2. There has been an accident with your Roomba. Unfortunately, it has bumped into a table and spilled orange juice all over itself, damaging its ability to determine its own location. It is now wondering sporadically around the house looking for its docking station: more precisely, every second, it chooses a cardinal direction that it can move to uniformly randomly and moves in that direction. If it reaches its docking station, it stops moving. You are given a grid, the Roomba's starting location, and the docking station location as input to the following algorithms you are to design.

   1. Design an algorithm to determine the probability that the Roomba has found the docking station after $t$ seconds. Let $n$ be the number of tiles in the grid. Then, your algorithm should take at most $O(n^3 \log t)$ time.
   2. Design an algorithm to determine the smallest time $t$ such that it is more than likely (more than a 0.5 probability) that the Roomba has found its docking station. This should take at most $O(n^3 t)$ time.
   3. Design an algorithm that solves the problem in (2) in $O(n^3 \log t)$ time.<br>
      <Dropdown title={`Hint`}>

      Recall the fact that the Roomba stops whenever it reaches its docking station. Because of this, as time goes on, it only gets more likely that it has reached the station -- the probabilty can never decrease. Hence, the probability is a _non-decreasing_ function of $t$. How can you use this?

      </Dropdown>

3. (Open ended) Let $G$ and $H$ be the adjacency matrices of two graphs with $n$ nodes. Interpret $GH$, $G + H$, $G^{-1}$ (if it exists), and $\det(G)$.

</Dropdown>

</Dropdown>

## Adjacency List

One useful metric of graphs is their **density**, which is how many edges they have relative to the number of vertices they have. A graph is called **dense** if its number of edges is asymptotically close to the maximum. A graph is called **sparse** if it is not **dense**; that is, if its number of edges is far less than the maximum. Some formalizations of these terms exist (see tangent <Todo/>), but for now just think of

In practice, many graphs are sparse. For example, imagine a graph representing locations in the real world. You could imagine a complex enough graph of this type having, say, a million different locations. For any particular location, however, the maximum number of edges between that location and adjacent locations is probably no more than 4 — maybe up to 5, 6, if you have some really crazy intersection. It is certainly nowhere close to a million. We would expect, then, that this graph probably has no more than 5 to 6 million edges, even though it could _in principle_ have up to ${10^6 \choose 2} \approx 10^{12}$ edges.

Sparse graphs benefit from a more efficient representation called an **adjacency list**. Here, for each vertex, we simply store a "list" of adjacent vertices. I put list in scare quotes since it really makes more sense to think of this as a set (there are no duplicates, nor is there any particular order), but conventionally it's just called a list anyway.

<Figure id={`3`} name={`adj-list`} 
        caption={`A graph (left) and its adjacency list representation (right). Hover over vertices
                  to see their corresponding list in the map.`}>
  <AdjList/>
</Figure>

Comparing the two figures, it should hopefully clear where the speedup comes from: instead of checking every node to see if it is adjacent to some vertex $v_i$, we can just instantly have access to a list of neighbors and iterate over it. So, neighbor iteration for adjacency lists is in $\Theta(\text{deg}(v_i))$. Since there are $\text{deg}(v_i)$ neighbors anyway, this is _literally the best we can do_. We can also iterate over all edges quickly by iterating every list; this takes $\Theta(n + m)$ time.

On the other hand, edge detection is not as nice. In order to determine if $(u, v) \in E$, we have to go through $u$'s list and check if $v$ is in it, or vice versa. As long as we know the length of each list, we can pick the shortest, so edge detection takes $\Theta(\text{min}(\text{deg}(u), \text{deg(v)}))$. Note that for dense graphs, this can be quite bad... $\Theta(n)$, in the worst case! Much worse than the $\Theta(1)$ we had for adjacency matrices. But in sparse graphs, where we expect the degree to be relatively small, this is still quite efficient.

So, we can see that there is a tradeoff — by using lists, we get faster neighbor and edge iteration, but slower edge detection. By using matrices, we get faster edge detection, but slower neighbor and edge iteration. As it turns out, however, neighbor iteration is used _wayyy_ more than any other operation. This operation is essentially the fundamental operation used when searching through graphs, which is kind of the thing you do with graphs. Hence, adjacency lists are generally used unless there is a good reason in particular to use adjacency matrices.
p

<Dropdown title={`Remark: Choice`}>
From what we have described here, it seems like one should always use adjacency lists unless one is in need of some esoteric matrix multiplication fuckery. There's another consideration we have so far sort of swept under the rug — what if you don't have control of the graph representation in the first place? This is more common than it might seem.

Imagine you are tasked to find the shortest path from _Cherry pie_ to _Adolf Hitler_ on Wikipedia through only hyperlinks. To determine this, you can treat Wikipedia as a graph, where each page is a node and edges connect pages that are accessible from each other through links. You can very quickly get access to all of the neighbors of a node in this graph: visit that page and look at all of the places that it links to. In this way, we use the Wikipedia graph as if it was implemeted using an adjacency list.

On the other hand, imagine a different problem: you have a set of line segments, some intersecting. You want to group these segments into components of segments that are intersecting, such that no two components have segments that intersect each other. You can this of the system of segments as a graph, where each segment is a node and each edge connects two segments that have a point of intersection. In this case, there isn't a quick way to get all of the neighbors of a node. You really have no choice but to iterate over all of the segments and find the ones that intersect with the segment you're interested in. However, determining whether two nodes are adjacent (or, whether two segments intersect) is very simple: just do the constant time geometry procudure to check for intersection. The way we handle this graph is much closer to an adjacency matrix, where edge detection is fast but neighbor iteration is slow.

Knowing how both of these representations work is useful, as you may encounter a situation where you are forced to use one over the other due to circumstance.

<Dropdown title={`Counter-Remark: Preprocessing`}>

Of course, if you really need to use a different graph representation than you are naturally provided, there is nothing stopping you from just constructing a new one that has the same graph data. For the line intersection graph, we could make a new adjacency list graph, make a node for each line segment, and add an edge for each intersection. This preproceesing step would take $\Theta(n^2)$, but then we would have a graph that we could efficiency query the neighbors of. Depending on the application, this might be something you want to do, but it may not be worth the effort if the given graph representation is good enough. Also, sometimes constructing an entirely new graph is infeasible. Consider the Wikipedia case above: in order to construct an adjacency matrix representation of Wikipedia, you would need to download all of Wikipedia and then put it in a very, very large matrix. It would take up about 40 petabytes of memory, or about two copies of _Call of Duty: Modern Warfare_.

</Dropdown>

</Dropdown>

<Dropdown title={`Tangent: Dynamic Graphs`}>
<Todo/>
</Dropdown>

# Searching

So far, we have only answered local questions about graphs:

- What are the neighbors of $v$?
- Are $u$ and $v$ adjacent?

But not yet questions which answer higher level, global properties of graphs. Here is an example:

**The reachability problem:** Given a graph $G$ and two vertices $u$ and $v$, determine whether there is a path between $u$ and $v$ using edges in $G$.

It is easy to see why this is a practically useful problem to have a solution for.

- If your graph represents a set of locations and roadways between them, this problem asks whether there is a (literal, physical) path between two locations.
- If your graph represents a social network (with vertices as people and edges as personal connections), this problem asks whether there is a line of connections between two people — this would tell you, for instance, whether a rumor could spread between these two people just by word of mouth.
- If your graph represents states and transitions between them, this problem asks whether there is a way to get from one state to another only through transitions.

The most common way to solve the reachability problem is with a **searching algorithm**. There are many different ways to search a graph, but almost all of them are basic variations of the following high level algorithm.

As it turns out, it's not much harder to solve a more general problem: _which vertices are reachable from $u$?_ This is the problem searching algorithms actually solve. Here's how: starting at $u$, we begin building a set $X$ of e**x**plored vertices, which we know for sure are reachable from $u$. We repeatedly expand $X$ by finding vertices which are connected to already explored vertices. Eventually, we run out of vertices to add, and we stop — at this point, $X$ contains all of the vertices reachable from $u$!

Let's try to describe this in a way that is a little closer to an actual algorithm. Let's say a vertex $v$ is a **fringe** vertex if $v \not\in X$, but $(u, v) \in E$ for some $u \in X$. Basically, $v$ is a fringe vertex if it hasn't been explored, but it is one edge away from a vertex that has been explored. Then our algorithm should repeatedly find a fringe vertex and add it to $X$. <AlgorithmLink id=1 name="search-algorithm"/> summarizes this approach, and <FigureLink id=4 name="graph-search-stepwise"/> visualizes the idea.

<Algorithm id={`1`} name={`search-algorithm`} caption={`A high level overview of searching using a fringe.`}>
<Psuedocode fn={graphSearch}/>
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

<Todo />
THINK ABOUT THIS. I think it can be salvaged, bit it's not quite right.

This direction is slightly more involved. There are many ways to proceed, but here is one idea: for each vertex $v$ that is $u$-reachable, we can prove the following invariant: _$X$ either contains $v$ or there is a fringe vertex $w$ such that there is a path from $u$ to $v$ that passes through $w$._

In other words, the invariant says that we have either found $v$, or we are _on our way_ to finding it through some fringe node $w$. Let us now prove the invariant, again by induction. First, the base case: when $X = \{ u \}$, does this invariant hold? If $u = v$, then the first part of the "or" is clearly true, since $v \in X$. Otherwise, consider any path from $u$ to $v$. Since $u \neq v$, the path consists of more than one path, and so there must be some node $w$ such that $(u, w) \in E$. But since $u$ is the only explored node, $w$ must be a fringe node.

Now, assuming the invariant is true for some iteration, we need to show that it holds for the next as well. Every iteration we add some fringe node $\ell$ to $X$. If $\ell = v$, then clearly the invariant is still true, since now $v \in X$. If $\ell \neq w$, then $w$ is stil a fringe node, and so the second part of the or "or" is still true. The more complicated case is when $\ell = w$. We know there is some path $p = \langle u, \dots, w, w', \dots v \rangle$ that connects $u$ and $v$ and contains $w$. Notice the suspiciously placed $w'$, which is the node after $w$ in the path. Since $p$ is a path, $(w, w') \in E$. After exp

So we've shown that the algorithm correctly finds exactly the vertices we need to find. However, we haven't specified completely how we even find fringe vertices in the first place. Until we do that, we can't even implement this algorithm, let alone analyze its runtime.

<Todo/>

## Breadth-first Search

<Algorithm id={`2`} name={`breadth-first-search-alg`} caption={`Breadth-first-search.`}>
<Psuedocode fn={breadthFirstSearch}/>
</Algorithm>

<Figure id={`5`} name={`breadth-first-search-fig`}
        caption={`A demonstration of breadth first search. Click to advance one iteration.`}>
  <Graph/>
</Figure>

## Depth-first Search

<Todo/>

## Path Reconstruction

<Todo/>

## The Minimum Spanning Tree Problem

**Theorem (The Spanning Tree Lemma).** Suppose $T$ is a spanning tree of a graph $G$. Let $e$ be an edge in $G \setminus T$. Then the following are true:

- $T \cup \{e\}$ contains a unique cycle $C$.
- Let $e' \in C$. Then $T^\prime = T - \{e\} \cup \{e'\}$ is a spanning tree of $G$.

<Figure id={`6`} name={`spanning-tree-cycles`}
        caption={`A spanning tree of a graph. Hover over a non-tree edge to reveal the cycle
                  guaranteed by the minimum spanning tree lemma.`}>
  <MSTHover />
</Figure>

## The Shortest Path Problem

<Figure id={`7`} name={`dijkstras-search-figure`}
        caption={`Dijkstra's shortest path algorithm, starting at $v_0$. Click to advance.`}>
<Shortest/>
</Figure>

<Algorithm id={`3`} name={`dijkstras-search-figure`} caption={`algorithm!!! algorithm!!!!!!`}>
<Psuedocode fn={dijkstrasSearch}/>
</Algorithm>
