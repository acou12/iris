import {
	alg,
	article,
	dropdown,
	fig,
	h1,
	h2,
	math,
	p,
	todo,
	ul
} from '$lib/components/article/article';

export default article('Ordered Dictionaries', ({ figMan, algMan }) => {
	return [
		h1(`Introduction`),

		p`Ordered dictionaries allow you to work with ordered data in a nice way. They function like normal dictionaries, but can be extended to allow for extra operations.`,

		h1(`The Abstract Data Type`),

		p`An ordered dictionary, as its name might suggest, resembles a standard, unordered dictionary in many ways. We will, in fact, use the exact same mathematical representation as an unordered dictionary. Every ordered dictionary represents a partial function $f : \\mathcal{K} \\to \\mathcal{V}$, where $\\mathcal{K}$ and $\\mathcal{V}$ are the key and value sets, respectively. The "ordered" part will allow us to perform some additional operations.`,

		p`Like a normal dictionary, we can **Insert**, associating a key with a value, and **Retrieve**, returning the value associated with some key. `,

		p`| Operation|Description|
|-|-|
| Insert$(k \\in \\mathcal{K}, v \\in \\mathcal{V})$ | Update $f$ so that $f(k) = v$. |
| Retrieve$(k \\in \\mathcal{K})$ | Return $f(k)$. |
| RetrieveRange$(\\ell \\in \\mathcal{K}, h \\in \\mathcal{K})$ | Return every $k \\in \\mathcal{K}$ such that $\\ell \\leq k \\leq h$. |
| Retrieve$(k \\in \\mathcal{K})$ | Return $f(k)$. |
`,

		h1(`Applications`),

		h1(`Representations`),

		h2(`The Binary Search Tree`),

		h2(`The Red-Black Tree`)
	];
});
