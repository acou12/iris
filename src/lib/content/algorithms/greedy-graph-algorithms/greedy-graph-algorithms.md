<script>
    import Dropdown from '$lib/components/article/Dropdown.svelte'
    import Todo from '$lib/components/article/Todo.svelte'
    import Figure from '$lib/figure/Figure.svelte'
    import Algorithm from '$lib/figure/Algorithm.svelte'
    import FigureLink from '$lib/figure/FigureLink.svelte'
    import AlgorithmLink from '$lib/figure/AlgorithmLink.svelte'
    import Psuedocode from '$lib/components/Psuedocode.svelte'

    import * as ps from './psuedocode'

    import MSTHover from './mst-hover.svelte';
    import Shortest from './shortest.svelte';
</script>

## Introduction

kasjhdkajshdkj

## The Minimum Spanning Tree Problem

**Theorem (The Spanning Tree Lemma).** Suppose $T$ is a minimum spanning tree of a graph $G$. Let $e$ be an edge in $G \setminus T$. Then the following are true:

- $T \cup \{e\}$ contains a unique cycle $C$.
- Let $e' \in C$. Then $T^\prime = T - \{e\} \cup \{e'\}$ is a spanning tree of $G$.

<Figure id={`1`} name={`spanning-tree-cycles`}
        caption={`A spanning tree of a graph. Hover over a non-tree edge to reveal the cycle
                  guaranteed by the minimum spanning tree lemma.`}>
  <MSTHover />
</Figure>

## The Shortest Path Problem

<Figure id={`2`} name={`dijkstras-search-figure`}
        caption={`blash k;dasjhdas kj.`}>
<Shortest/>
</Figure>

<Algorithm id={`2`} name={`dijkstras-search-figure`} caption={`algorithm!!! algorithm!!!!!!`}>
<Psuedocode fn={ps.dijkstrasSearch}/>
</Algorithm>
