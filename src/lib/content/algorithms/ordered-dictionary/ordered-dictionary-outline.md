# Introduction

Ordered dictionaries allow you to work with ordered data in a nice way. They function like normal dictionaries, but can be extended to allow for extra operations.

# The Abstract Data Type

- ordered dictionaries have the same abstract representation as dictionaries. they are partial functions.
- there is one extra requirement: the domain K must be _linearly ordered_. formally, we must provide along with our domain type KK a relation <= on KK that is transitive and total.
- this order provides extra methods.

get(k) - return f(k)
put(v) - assign f(k) = v
delete(v) - remove k from K
successor(k) - return the smallest k' in K such that k < k'.
predecessor(k) - return the largest k' in K such that k' < k
search(l, h) - return all k in K such that l <= k <= h

# Applications

- like normal dictionaries, ordered dictionaries are used where we have a set of data which is identifiable by a key. ordered dictionaries can be used for fast associations between this key and the data. however, ordered dictionaries provide the additional capability to use the ordering of the keys in useful ways. ODs are typically used in applications where _searching over a range_ is a common opeartion. think:

  - a program filtering products in a range of price (or more generally, database applcations, where we want to query all items with some property in a range)
  - scheduling applications, where we need to determine if a block of time is scheduled, or we need to find the first or last free time

- the principles underpinning ODs are also used in many _multi-dimensional search_ applications, in which your keys consist of multiple dimensions.

ODs are incredibly versitle, so they can be used in a lot of place. as we will see, however, if order operations are not need (or if a linear order doesn't even exist or make sense), typically a standard dictionary is more performant.

# Representations

as in the last chapter, we first discuss the naive **list** representations to see where they go wrong. then, we discuss the **binary search tree** as well as an optimization of it, the **red black tree**.

## Ordered List

the most straightforward way to implement an ordered dictionary is by maintaining a list of the entry set ordered by keys. we can implement `get` and `put` in the same way using binary search.

L: list of K

get(k)
binary search L to find (k, v)
return v

put(k, v')
binary search L to find (k, v)
update v to v'

- for succ, find index and go up 1 (log(n))
- for pred, " " " " " " " " down 1 (log(n)) (leave as ex?)
- for search, find both indices and return slice (log(n) + k) (leave as ex?)

(figure: perform operations on a small array representation.)

## The Binary Search Tree

- binary search is pretty good, but insertion is slow.
- we want to keep binary searching, but on a structure more conducive to insertion. this is where trees come in
- definition

  - binary search tree
  - subtree property: T_l < k and k <= T_h

(figure: hover over vertices to see their left and right subtrees. they turn blue and red for lesser and greater, respectively.)

- search:
  - abuse the same binary search property: we can split our set into two smaller sets and search the correct one.
- insertion:
  - do exactly the same thing, but now we can insert in constant time when we find where our guy needs to go.
- deletion: complicated
- pred
- succ
-

### Variations

- one of the hallmarks of the binary search tree is its ability to be slightly modified to achieve different goals. more data in nodes is useful.
  - ex:

### Analysis

(figure: THE STICK)

(aside ("tip"): degenerate/edge/pathological cases are useful for bounding. try to think of cases where things so as wrong as possible. in this case, when we move to a subtree, the worst thing that can happen is that we decrease the size by exactly one. this is exactly what happens in the stick)

## The Red-Black Tree

# Summary
