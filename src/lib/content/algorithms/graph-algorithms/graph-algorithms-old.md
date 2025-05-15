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

h1(`Introduction`),

h1(`Definitions`),

p(`Formally, a **graph** is an abstraction representing some objects and connections between pairs of objects. In its simplest form, a graph has just two pieces:`),

p(`- A set of **vertices** $V$, representing the objects we are interested in. Vertices can also be called **nodes**, points, junctions, pins, knobs... this text will keep standard computer science convention by using the terms **vertex** and **node** interchangably, in no way that is internally consistent.`),
p(`- A set of **edges** $E$, consisting of pairs of the form $(v_i, v_j)$, representing a connection between the vertices $v_i$ and $v_j$. Edges can also be called arcs, lines, branches, connectors, strands, nerves... this text will use the term **edge**. Depending on whether a graph is **directed** or **undirected**, edges may be one-directional or bidirectional (respectively). For now, we will assume graphs are undirected, but we will discuss directed graphs later, and little modification is typically needed to make algorithms and graph representations work with directed graphs.`),

p(`If $G$ has an edge $e = (u, v)$, we say $u$ and $v$ are **adjacent**. We also say $u$ is a **neighbor** of $v$ and $v$ is a neighbor of $u$. The edge $e$ is also referred to as being **incident** on $u$ (and $v$, as well). The **degree** of a node $v$ (denoted $\\text{deg}(v)$) is the number of other nodes adjacent to it, or in other words, the number of neighbors it has. Equivalently, $\\text{deg}(v)$ is the number of edges incident on $v$.`),

p(`We define a **walk** as a sequence of nodes such that any two adjacent nodes in the sequence are adjacent in $G$. A walk is called a **path** if it consists of distinct vertices -- that is, it doesn't go over any vertex more than once. Two vertices $u$ and $v$ are then **reachable** from each other if there is a path (or walk) that starts at $u$ and ends at $v$ (or vice versa).`),

p(`A graph can also be **weighted**. In a weighted graph, we assign a value (usually, a real number) to every edge. To denote weights, we will assume there exists a function $w: V \\to \\mathbb{R}$, defined such that $w(e)$ is the weight assigned to the edge $e$. We can also talk about the total weight of a walk (or path), defined as the sum of the weights of each edge in the walk (or path).`),

<Definitions/>

p(`As with most sufficiently complex mathematical notions, graph theory terminology is an [all-consuming black hole](https://en.wikipedia.org/wiki/Glossary_of_graph_theory), and we have only covered a small fraction of all of the words one can use to describe graphs and their parts and properties. However, these terms are sufficient for establishing some basic claims about graphs, which the next section will do.`)

h1(`Properties`),

p(`A graph is the first data structures that we have come across which has two separate, semi-independent sizes: the number of nodes and the number of edges. It is possible for a graph to have a large number of nodes, but not many edges, or vice versa; furthermore, edges can be clustered in certain parts of the graphs, such that the degree of one node is much larger than another. These facts slightly complicate our desire to determine the runtime complexity of graph algorithms. It may seem like an algorithm that operates on many nodes and their neighbors would have a runtime expressed only through some complicated combination of sums. As it turns out, however, it is possible to use some bounds to make this analysis easier.`)

p(`The first important fact is that the number of edges can only be so large relative to the number of nodes. Imagine trying to fill in a graph with $n$ nodes with as many edges as possible. We can start at node $1$, connecting it to every other node, giving $n - 1$ edges. Then, we can connect node $2$ to every other edge. We have already added the edge $(1, 2)$ before, so we only get $n - 2$ more edges from this action. Continuing this until we have no more edges to add yields what is called a **complete graph**. The number of edges in this graph is`)

$$
\\sum_{i=1}^{n} (n - i) = \\sum_{j=0}^{n-1} j = \\frac{n(n-1)}{2}
$$

p(`Less precisely, but more importantly, **an $n$-node graph can have at most $\\Theta(n^2)$ edges**. This allows us to upper bound certain quantities which contain both $V$ and $E$ in terms of just $E$, which can be useful if the precise edge structure of a graph is not known.`)

p(`For instance, suppose a graph algorithm takes $\\Theta(V^2 + E^2)$ time. Since $E$ can be as low as zero, the algorithm takes at least $\\Omega(V^2)$ time, but from our upper bound, the algorithm takes at most $O(V^2 + V^4) = O(V^4)$ time.`)

p(`Another common workflow when working with graphs is doing some operation on every neighbor of every node. As we mentioned, the degree is free to vary wildly throughout a graph, so it is useful to have a bound on the total sum of all of these degrees, which the next lemma provides.`)

p(`**The Handshaking Lemma.** For any graph $G$, the sum of the degrees of every node is twice the number of edges. That is,`)

$$
\\sum_{v \\in V} \\text{deg}(v) = 2|E|
$$

p(`_Intuition._ It is more useful to consider the edge-incidence definition of degree here. First, observe that every edge is incident on exactly two vertices. Thus, in our sum of degrees, any given edge contributes to exactly two $\\text{deg}(v)$ terms by 1. Therefore, we would expect this sum to be equal to twice the number of edges.`)

p(`_Proof._ We can formalize this intuitive idea. Let $\\delta_{ij} = 1$ if and only if $e_j$ is incident on vertex $v_i$; otherwise, it is defined as 0. So, we can now rewrite $\\text{deg}(v_i) = \\sum_{j=1}^{m} \\delta_{ij}$. So, the sum of all of these degrees is`)

$$
\\sum_{i=1}^{n} \\sum_{j=1}^{m} \\delta_{ij} = \\sum_{j=1}^{m} \\sum_{i=1}^{n} \\delta_{ij} = \\sum_{i=1}^{n} 2 = 2m
$$

p(`Here we simply rearrange the sum and use the fact that there are exactly 2 vertices incident on any edge, so $\\sum_{i=1}^{n} \\delta_{ij} = 2$.`)

<Dropdown title={`Nomenclature: Handshaking`}>

If you were curious where the name **handshaking lemma** comes from: imagine a set of people at a computer science conference, simultaneously shaking hands with one another. The nodes in the graph represent the computer scientists and each edge represents a handshake between two people. The degree of a node, then, is the number of hands that that person has, and the lemma tells us that the total number of hands is equal to twice the number of handshakes, which makes sense, since a handshake involves two hands! You might be wondering how these people have so many hands. It is a fairly well-kept secret that after you receive a doctorate degree, you gain the ability to grow an arbitrary number of hands. This is something to look forward to if you plan on furthering your education.

</Dropdown>

h1(`Representations`),

p(`We have discussed the mathematical idea of a graph, but it remains to define the abstract data type for use in our code:`),

p(` | Operation | Description | | ------------------ | ---------------------------------------------------------------------------- | | Vertex iteration | Iterate over every vertex $v \\in V$. | | Edge iteration | Iterate over every edge $e \\in E$. | | Edge detection | For two vertices $u$ and $v$, determine whether $(u, v) \\in E$. | | Neighbor iteration | For some specified $u$, iterate over every $v \\in V$ where $(u, v) \\in E$. |`)

p(`There are two common ways of implementing this data type.`),

h2(`Adjacency Matrix`),

p(`One way to interpret a graph is that it is simply a binary relation on the vertices — that is, any two vertices are either adjacent or they aren't adjacent. This leads to a natural programmatic representation — for every pair of vertices, keep track of whether they are adjacent or not. We can use any data type that acts as a two-place boolean predicate, but the most obvious choice is a two dimensional array. True to the relation interpretation, we could use a two-dimensional boolean array, but for reasons that will make sense later, it is more typical to use an integer array and store a $1$ for adjacency and $0$ for non-adjacency. This array is known as an **adjacency matrix**.`),

<Figure id={`2`} name={`adj-matrix`} 
        caption={`A graph (left) and its adjacency matrix representation (right). Hover over vertices
                  to see their corresponding row and column in the matrix.`}>
  <AdjMatrix/>
</Figure>

p(`Adjacency matrices perform one operation _very_ quickly: to detect whether two vertices are connected by an edge, we can simply test whether the adjacency matrix has a 1 in the corresponding position. This can be done with (approximately) two pointer deferences, so this operation takes $\\Theta(1)$ time.`),

p(`Let us investigate the other operations. To iterate over every neighbor of $v_i$, we can iterate through the $i$-th row and report all the entries which are 1. Since a row is size $n$, this always takes $\\Theta(n)$ time. Similarly, to iterate over all edges, we can go through the entire matrix and return all of the entries with a 1 in them, taking $\\Theta(n^2)$ time. As we will see, neither of these are particularly good — this is because we waste a lot of time iterating over entries which don't actually represent any edges, but are just empty placeholds for where edges _could_ be. The next representation, the adjacency list, addresses this issue.`),

h2(`Adjacency List`),

p(`One useful metric of graphs is their **density**, which is how many edges they have relative to the number of vertices they have. A graph is called **dense** if its number of edges is asymptotically close to the maximum. A graph is called **sparse** if it is not **dense**; that is, if its number of edges is far less than the maximum. Some formalizations of these terms exist (see tangent <Todo/>), but for now just think of`),

p(`In practice, many graphs are sparse. For example, imagine a graph representing locations in the real world. You could imagine a complex enough graph of this type having, say, a million different locations. For any particular location, however, the maximum number of edges between that location and adjacent locations is probably no more than 4 — maybe up to 5, 6, if you have some really crazy intersection. It is certainly nowhere close to a million. We would expect, then, that this graph probably has no more than 5 to 6 million edges, even though it could _in principle_ have up to ${10^6 \\choose 2} \\approx 10^{12}$ edges.`),

p(`Sparse graphs benefit from a more efficient representation called an **adjacency list**. Here, for each vertex, we simply store a "list" of adjacent vertices. I put list in scare quotes since it really makes more sense to think of this as a set (there are no duplicates, nor is there any particular order), but conventionally it's just called a list anyway.`),

<Figure id={`3`} name={`adj-list`} 
        caption={`A graph (left) and its adjacency list representation (right). Hover over vertices
                  to see their corresponding list in the map.`}>
  <AdjList/>
</Figure>

p(`Comparing the two figures, it should hopefully clear where the speedup comes from: instead of checking every node to see if it is adjacent to some vertex $v_i$, we can just instantly have access to a list of neighbors and iterate over it. So, neighbor iteration for adjacency lists is in $\\Theta(\\text{deg}(v_i))$. Since there are $\\text{deg}(v_i)$ neighbors anyway, this is _literally the best we can do_. We can also iterate over all edges quickly by iterating every list; this takes $\\Theta(n + m)$ time.`),

p(`On the other hand, edge detection is not as nice. In order to determine if $(u, v) \\in E$, we have to go through $u$'s list and check if $v$ is in it, or vice versa. As long as we know the length of each list, we can pick the shortest, so edge detection takes $\\Theta(\\text{min}(\\text{deg}(u), \\text{deg(v)}))$. Note that for dense graphs, this can be quite bad... $\\Theta(n)$, in the worst case! Much worse than the $\\Theta(1)$ we had for adjacency matrices. But in sparse graphs, where we expect the degree to be relatively small, this is still quite efficient.`),

p(`So, we can see that there is a tradeoff — by using lists, we get faster neighbor and edge iteration, but slower edge detection. By using matrices, we get faster edge detection, but slower neighbor and edge iteration. As it turns out, however, neighbor iteration is used _wayyy_ more than any other operation. This operation is essentially the fundamental operation used when searching through graphs, which is kind of the thing you do with graphs. Hence, adjacency lists are generally used unless there is a good reason in particular to use adjacency matrices.`),

h1(`Searching`),

p(`So far, we have only answered local questions about graphs:` +`- What are the neighbors of $v$?` +`- Are $u$ and $v$ adjacent?`),

p(`But not yet questions which answer higher level, global properties of graphs. Here is an example:`),

p(`**The reachability problem:** Given a graph $G$ and two vertices $u$ and $v$, determine whether there is a path between $u$ and $v$ using edges in $G$.`),

p(`It is easy to see why this is a practically useful problem to have a solution for.` +`- If your graph represents a set of locations and roadways between them, this problem asks whether there is a (literal, physical) path between two locations.` +`- If your graph represents a social network (with vertices as people and edges as personal connections), this problem asks whether there is a line of connections between two people — this would tell you, for instance, whether a rumor could spread between these two people just by word of mouth.` +`- If your graph represents states and transitions between them, this problem asks whether there is a way to get from one state to another only through transitions.`)

p(`The most common way to solve the reachability problem is with a **searching algorithm**. There are many different ways to search a graph, but almost all of them are basic variations of the following high level algorithm.`),

p(`As it turns out, it's not much harder to solve a more general problem: _which vertices are reachable from $u$?_ This is the problem searching algorithms actually solve. Here's how: starting at $u$, we begin building a set $X$ of e**x**plored vertices, which we know for sure are reachable from $u$. We repeatedly expand $X$ by finding vertices which are connected to already explored vertices. Eventually, we run out of vertices to add, and we stop — at this point, $X$ contains all of the vertices reachable from $u$!`),

p(`Let's try to describe this in a way that is a little closer to an actual algorithm. Let's say a vertex $v$ is a **fringe** vertex if $v \\not\\in X$, but $(u, v) \\in E$ for some $u \\in X$. Basically, $v$ is a fringe vertex if it hasn't been explored, but it is one edge away from a vertex that has been explored. Then our algorithm should repeatedly find a fringe vertex and add it to $X$. <AlgorithmLink id=1 name="search-algorithm"/> summarizes this approach, and <FigureLink id=4 name="graph-search-stepwise"/> visualizes the idea.`),

<Algorithm id={`1`} name={`search-algorithm`} caption={`A high level overview of searching using a fringe.`}>
<Psuedocode fn={graphSearch}/>
</Algorithm>

<Figure id={`4`} name={`graph-search-stepwise`}
        caption={`A visualization of the high level graph search algorith. Orange vertices are those that are one edge away from the explored set. Click an edge to add it and its fringe vertex to the explored set.`}>
<GraphSearchStepwise />
</Figure>

p(`We have left out a lot of details here, but let's first prove that this high-level algorithm accomplishes our goal before we try to flesh it out.`),

p(`**Theorem.** After <AlgorithmLink id=1 name="search-algorithm"/> terminates, $X$ contains exactly the vertices in $G$ which are reachable from $u$.`),

p(`Let's first prove the following invariant: _all vertices in $X$ are reachable from $u$ _.This certainly holds before the loop starts ($u$ is reachable from itself), so we just need to show that it holds after each iteration of the loop. We need to show that the new element we've added to $X$, the fringe vertex $v$, is reachable from $u$. By definition of fringe vertex, there is some $w \\in X$ such that $(w, v) \\in E$. By the invariant, $w$ is reachable from $u$, and so there is some path`),

p(`$$
p = \\langle u, p*1, \\dots, p*{n-1}, w \\rangle

$$
`)

p(`If we construct a new path by simply appending the edge $(w, v)$, we get the path`),

p(`
$$

p' = \\langle u, p*1, \\dots, p*{n-1}, w, v \\rangle

$$
`)

p(`and so $v$ is reachable from $u$. Thus, the invariant is preserved.`),

p(`So, when the algorithm terminates, $X$ contains only vertices rachable from $u$. Aren't we done, then? Not quite. We have shown that if a vertex is in $X$, it is reachable from $u$, but we still need to show that if a vertex is reachable from $u$, it is in $X$. Essentially, thus far we have only shown that $X$ is a subset of the vertices reachable from $u$, but we need to show it is equal.`),

p(`So we've shown that the algorithm correctly finds exactly the vertices we need to find. However, we haven't specified completely how we even find fringe vertices in the first place. Until we do that, we can't even implement this algorithm, let alone analyze its runtime.`),

<Todo/>

h2(`Breadth-first Search`),

<Algorithm id={`2`} name={`breadth-first-search-alg`} caption={`Breadth-first-search.`}>
<Psuedocode fn={breadthFirstSearch}/>
</Algorithm>

<Figure id={`5`} name={`breadth-first-search-fig`}
        caption={`A demonstration of breadth first search. Click to advance one iteration.`}>
  <Graph/>
</Figure>

h2(`Depth-first Search`),

<Todo/>

h2(`Path Reconstruction`),

<Todo/>

h2(`The Minimum Spanning Tree Problem`),

**Theorem (The Spanning Tree Lemma).** Suppose $T$ is a spanning tree of a graph $G$. Let $e$ be an edge in $G \\setminus T$. Then the following are true:

- $T \\cup \\{e\\}$ contains a unique cycle $C$.
- Let $e' \\in C$. Then $T^\\prime = T - \\{e\\} \\cup \\{e'\\}$ is a spanning tree of $G$.

<Figure id={`6`} name={`spanning-tree-cycles`}
        caption={`A spanning tree of a graph. Hover over a non-tree edge to reveal the cycle
                  guaranteed by the minimum spanning tree lemma.`}>
  <MSTHover />
</Figure>

h2(`The Shortest Path Problem`),

<Figure id={`7`} name={`dijkstras-search-figure`}
        caption={`Dijkstra's shortest path algorithm, starting at $v_0$. Click to advance.`}>
<Shortest/>
</Figure>

<Algorithm id={`3`} name={`dijkstras-search-figure`} caption={`algorithm!!! algorithm!!!!!!`}>
<Psuedocode fn={dijkstrasSearch}/>
</Algorithm>
$$
