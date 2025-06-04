import {
	alg,
	article,
	dropdown,
	fig,
	h1,
	h2,
	h3,
	math,
	p,
	todo,
	ul
} from '$lib/components/article/article';

export default article('Sets and Dictionaries', ({ figMan, algMan }) => {
	return [
		h1(`Introduction`),

		p`.`,

		h1(`The Interface`),

		p`A dictionary represents a dynamic mapping between two types. We will formalize such a mapping through a **partial function**. A partial function is a function where only some of the domain is defined. In particular, we say a dictionary object represents a function $f : \\mathcal{K} \\to \\mathcal{V}$, where $\\mathcal{K}$ is the **key universe** and $\\mathcal{V}$ is the **value universe**, along with a (usually finite) set $K \\subseteq \\mathcal{K}$ called the **key set**. The function $f$ is only well-defined for $k \\in K$. `,

		p`There are two type of dictionary operations. The first two, Has and Get, allow you to query the dictionary, determining whether a key is part of the dictionary and, if so, which value the function $f$ maps it to. The second two, Set and Delete, allow you to update the mapping.`,

		p`| Operation|Description|
|-|-|
| Has$(k: \\mathcal{K})$ | Return whether $k \\in K$. |
| Get$(k: \\mathcal{K})$ | Return $f(k)$. |
| Set$(k: \\mathcal{K}, v: \\mathcal{V})$ | Update $f$ so that $f(k) = v$, adding $k$ to $K$ if necessary. |
| Delete$(k: \\mathcal{K})$ | Remove $k$ from $K$. |
`,

		h1(`Applications`),

		p`there are a lot`,

		h1(`Implementations`),

		p``,

		h2(`The Association List`),

		p`To begin, let us describe the simplest dictionary implementation -- one you might come up with one your own with little effort. Essentially, we maintain a dynamic list of **entries**, each corresponding to a key in the key set $K$. Each **entry** is a key-value pair $(k, v)$ where $f(k) = v$.`,

		p`Implementing the dictionary methods using this list is quite simple. To find and/or modify the value mapped from a certain key, we can scan the list and look for the key in question. For Has, we just return whether any entry matches. For Get, we return the value of the matching entry. For Set, we update the matching entry, or use the dynamic list's Add if it isn't already present. Finally, for Delete, we find the matching entry and use the dynamic list's Delete.`,

		p`Of course, it is rare that the first thing you think of happens to be the best solution, and this is no exception. The advantage the association list implementation is that it is easy to describe and implement, but its drawback is in efficiency. In the worst case, every one of these methods takes $\\Theta(s)$ time, where $s$ is the **size** of the dictionary (the number of keys). We don't officially know this yet, but the hash table implementation takes constant time for all methods in the expected case, so linear time isn't all that impressive, and in fact dictionaries would be near useless if this was the best we could do. Nevertheless, the association list implementation is a solid baseline implementation we can build upon for the next implementations. The idea of an **entry** is one we will continue to use; keeping the key and value paired together is convenient since we can quickly retrieve the latter if needed. However, the bottleneck for this implementation is the time it takes to find the specific entry we are interested in. The next implementation, the hash table, alleviates this bottleneck by taking advantage of the speed provided by random access.`,

		h2(`The Hash Table`),

		p`In our discussion of the association list implementation, we saw that **entries** are convenient data structures that allow us to associate key-value pairs in memory, but that a brute-force scan of a list of entries is too slow to be useful. In this section, we will see how we can use the notion of a **hash function** to greatly improve the expected case running time of dictionary operations.`,

		p`To begin, let us start with a special case of the dictionary where we restrict the key universe $\\mathcal{K}$ to be some subset of the integers $[0, m)$, where $m$ is a fixed integer called the **table size**.`,

		p`We will continue to use entry objects, but instead of a using a list like we did before, let us store our entries in an **array** $A$ of size $m$. We will set up the array so that $A(k)$ corresponds to the entry for $k$ if $k \\in K$ and $A(k) = \\text{Nil}$ if $k \\not\\in K$. Consequentially, we can write constant time methods for all four methods: for Has, we just check if $A(k) = \\text{Nil}$. For Get, we return the value of the entry $A(k)$. For Set, we update the value of the entry $A(k)$. For Delete, we set $A(k) \\gets \\text{Nil}$. Since they only use a constant number of array accesses and assignments, they all run in constant time.`,

		p`At the moment, this just looks like an off-brand array, where the only real functionality we've added is the distinction between array slots that are defined and undefined. What we really want is a way to extend such a method to all possible key universes. We can do such a thing with a **hash function**.`,

		p`A **hash function** for a key universe $\\mathcal{K}$ is defined as a function $h : \\mathcal{K} \\to [0, m)$. A hash function is like a bridge between an arbitrary type and the indices of the hash table. We simply feed our key $k$ into this hash function, yielding an index $h(k)$, and then use the $h(k)$-th entry in the hash table. Let us consider a concrete example. Suppose our key universe is the set of 5-letter words (we'll call that $\\mathcal{A}_5$) and our value universe is the set of integers. We can let $m = 26$ and define a hash function $h : \\mathcal{A}_5 \\to [0, 26)$ to take the input string and return the number corresponding to the first character of the string. The number corresponding to a string is its index in the alphabet, so $'\\text{a}'$ is mapped to 0, $'\\text{b}'$ is mapped to 1, and so on. Therefore, $h("\\text{apple}") = 0$ and $h("\\text{hello}") = 7$. Figure () shows an example of how the hash function is applied to interact with the hash table.`,

		p`Unfortunately, the use of a hash function introduces a new problem: what if we have two distinct keys $k_1 \\neq k_2$, but we have $h(k_1) = h(k_2)$? In our concrete example, it is easy to see that if two words start with the same letter, they have the same hash value. Such a case is called a **collision**. If two keys have the same hash value, they'll map to the same slot in the array; hence, we might accidentally overwrite an entry with a different one or use an entry for one key that was intended for another. There are two ways to try to remedy this: design hash functions that never collide, or handle collisions when they happen. We will see that the former remedy is not practical, and that latter is done in practice.`,

		p`Let us try to design a hash function that has no collisions using our example key universe $\\mathcal{A}_5$. More precisely, we want to design an **injective** function $h : \\mathcal{A}_5 \\to [0, 26)$. We immediately encouter a problem: there are $26^5 \\approx 10^6$ strings in our function domain, but only 26 possible outputs. Recall that the **pigeonhole principle** ↶ tells us that if the domain is larger than the codomain, the function cannot be injective -- in the terminology of hash sets, there must be at least one collision. In essence, we simply _don't have enough room_ in the hash table to fit all of the possible keys we can hash. The only way to address this is by increase $m$ to $26^5$, thereby increasing the number of slots in the hash table to $26^5$. This is the main problem with this approach: we're forced to make the size of the table extremely large to account for all of the possible keys, even if we only end up using a small number of them in our program. That's not even mentioning that if $\\mathcal{K}$ is _infinite_, it is impossible to construct an injective hash function without infinite memory -- even today, that's hard to come by.`,

		p`So, we're left with the second option: if collisions are inevitable in practice, how do we handle them? There are two primary approaches to dealing with collisions, yielding two different hash table implementations: **chained hashing** and **open-address hashing**. (These names are slightly misleading, since the _hashing_ part doesn't change, only the collision handling.)`,

		h3(`Chained Hashing`),

		p`We noticed earlier that because of the **pigeonhole principle**, we don't have enough room to fit all of the possible keys in their own slot without increasing the size of the hash table disproportionally to the number of keys we actually end up adding. Chained hashing takes a simple approach to fixing this: keep the table size small, but make more room in each proverbial pigeonhole for the proverbial pigeons to share! That is, instead of keeping a single entry in each array slot, maintain a set of entries in each slot, called a **bucket**. When two elements hash to the same value, they share the same bucket. Now instead of immediately retrieving or assigning an entry to a slot, we might have to search for it in or add it to the bucket it is located in, but ideally, the size of these buckets should be much smaller than the number of elements.`,

		p`Let's start with an analysis of the worst case runtime. Hash functions should be designed in a way that distributes keys uniformly, but even when they are, it is possible that they happen to map many keys to the same value by chance. In the worst case, imagine we have $s$ elements in our dictionary, _all_ of which map to the integer zero. If we call Set($k$, $v$), it is possible that $k \\in K$ and hence $h(k) = 0$, so we need to call Set on the bucket, which takes $\\Theta(s)$ time in the worst case. The remaining methods are similar: if all the keys map to the same bucket, our implementation is no better than the association list implementation. `,

		p`Under suitable assumptions, however, this case and others like it are _very_ unlikely to occur. Hash functions in practice are designed to satisfy **uniformity** and **universality** properties.`,

		h3(`Open-Address Hashing`),

		p`asldkjalskdj`,

		dropdown(`Tangent: Caching`, [
			p`(open-address hashing is better for caching because it uses spatial locality [?])`
		])
	];
});
