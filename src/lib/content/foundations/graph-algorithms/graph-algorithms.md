<script>
import Graph from './graph.svelte';
</script>

## What is a graph?

A graph has two components:

- A set of **vertices**, $V$. These can be anything, but for convenience we typically enumerate these using $v_i$, where $i$ is a positive integer.
- A set of **edges**, $E$. An edge is a pair $(v_i, v_j)$, representing a _connection_ between two vertices.

<Graph/>