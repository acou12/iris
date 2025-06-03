# Introduction

Dictionaries allow you create very fast mappings between data.

# Interface

- dictionaries simulate _partial functions_ that we can modify over time. in particular, a dictionary consists of a partial function $f: \\mathcal{K} \\to \\mathcal{V}$ defined on a set $K \\subset \\mathcal{K}$.

has(k) - return whether k in K
get(k) - return f(k)
put(k, v) - update f such that f(k) = v
delete(k) - remove k from K

# Applications

- functions are used everywhere, so dictionaries show up in almost every application.
- they can be used to save time using space -- the space-time tradeoff. by saving some data, we can speed up later tasks. (particular example? counts? duplicates?)
- they show up particularly in database applications

- note that if we ignore f, our dictionary is simply a _dynamic set_, a set that we can add and remove elements to. (duplicates)

# Implementations

- we will start with a naive implementation, a normal list containing all of the entries. we show the inadequacies of this approach and introduce the **hash table**, which is the most common dictionary implementation.

- an _entry_ is a (k, v) pair, where k is a key, v is a value, and f(k) = v.
  - implementations of dictionaries often keep track of such an object for each key, to allow quick retrieval of the value once the key is located.
  - a dictionary can also be thought about as a set of entries with unique keys. this is basically the definition of a function.

## List

- the most straightforward approach is to maintain a list which simply contains an entry for each key-value mapping, in no particular order.

has(k)
for e in entries
if e.key == k
return true
return false

get(k)
for e in entries
if e.key == k
return e.value
// precondition was not satisfied

put(k, v):
found = false
for e in entries
if e.key == k
e.value = v
found = true
if not

delete(k)
...

- each algorithm takes linear time.
- the problem with the list implementation is that it is fairly inefficient. in many applications, linear time is sufficient (and quite good), but hash table operations are run many, many times in practice, and it is possible to do much better than this, as we will see.

## The Hash Table

- to motivate the hash table, let's start with a special case of the dictionary: when the keys are all integers in the range [0, m). in this case, we can create a very efficient implementation: construct an array H with size m, where H[i] contains the entry corresponding to f(i). our methods are

get(k)
return H[k].value

set(k, v)
if H[k] != null
H[k].value = v
else
H[k] = entry(k, v)

... (and so on) ...

these methods are _fast_ -- the fastest, in fact. since they consist of only a constant number of array accesses or modifications, **all methods are O(1)**.

of course, we want to be able to use types other than keys in this very specific range! a natural idea: can we quickly associate data types with integers in this range, and then use that integer as an index, as in this implementation? this is the motivation for what is called a _hash function_.

a hash function is a computable function f : KK -> [0, m), where m is a positive integer called the _hash table size_. before we dive into designing a hash function for a type, let us first see how we might use this to the end discussed earlier. we could try to use an implementation akin to [bounded integer implementation], but instead of using H[k] directly, we use H[f(k)].

there are some problems, however. the main problem: what if we have two keys k and l such that f(k) = f(l)? this is known as a _collision_. these two keys will step on each other's toes in the array and we might overwrite one over the other or incorrectly report that one is contained when it is not. while there are some way of dealing with collisions, they are inpractical to completely avoid for a couple of reasons:

- for a finite type, if there are more than m possibilities, the pidgeonhole principles _guarantees_ that there will be at least one collision. hence, m must be larger than the number of number of possibilities, but the memory we use is proportional to m
- constructing functions that are _bijective_ is either:
  - very difficult or
  - very space inefficient
- most types have an infinite number of possibilities, which means a bijective function is _impossible_, regardless of the hash table size you choose.

because collisions are inevitable, we need a way to deal with them. we will consider two approaches:

### Chained Hashing

the first idea is fairly simple: in the case we keys that collide with each other, we just make some more room in the table for all of them! that is, instead of H being an array of entries, it is an array of m _buckets_, where each bucket is a set of entries. each bucket starts out empty, and to add a new element to the dictionary, we hash its key, find the right bucket, and add the entry. we implement the other methods similarly -- find the right bucket, and then within the bucket, find the right element, and then do the operation.

(methods)

### Open-Address Hashing

here, we keep the original single-valued array setup we had before, but now in the case of the collision, we keep looking until we find a vacant slot.

(aside ("nomenclature"): hash functions. i don't actually know where this word comes from.)

### Good Hash Functions

an important part of the hash table implementation is using a hash function for your type that exhibits many of the assumptions we want from them. as a reminder, we want our hash function to be:

- **fast**. in most cases, this means _constant time_. since this function in every method call, we want to make sure it takes little time to compute. with a few exceptions (see aside about this), this is a relatively easy requirement.
- **uniform**. more precisely, for a random key k, we would like any value of h(k) to be equally likely. this requirement is more difficult to satisfy, so it is the one we will focus on.

theoretically, designing uniform hash functions is an interesting and non-trivial problem. most approaches use assumptions based on fields of mathematics like analysis and number theory. we will present some hash functions and intuitive justifications for their uniformity, but will defer formal treatments to asides and further reading.

(do this)
