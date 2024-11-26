<script>
import Graph from './graph.svelte';
</script>

## Graphs

A graph is an abstraction representing some objects and connections between pairs of objects. In its simplest form, a graph has just two pieces:
- A set of vertices $V$, representing the objects we are interested in. These are often called nodes, as well. 
- A set of edges $E$, consisting of pairs of the form $(v_i, v_j)$, representing a connection between vertices.

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
