// todo: fix
import Variables from '$lib/content/computer-science/variables/variables.md';
import DataTypes from '$lib/content/computer-science/data-types/data-types.md';
import AngularMomentum from '$lib/content/physics/angular-momentum/angular-momentum.md';
import Momentum from '$lib/content/physics/momentum/momentum.md';
import Smh from '$lib/content/physics/shm/simple-harmonic-motion.md';
import GraphAlgorithms from '$lib/content/foundations/graph-algorithms/graph-algorithms.md';
import SweepLine from '$lib/content/interactive-systems/sweep-line.md';
import Curl from '$lib/content/vector-calc/curl/curl.md';
import SetTheory from '$lib/content/discrete-math/set-theory/set-theory.md';
import GraphTheory from '$lib/content/discrete-math/graph-theory/graph-theory.md';

export type Course = {
	prettyName: string;
	name: string;
	color: string;
	topics?: Topic[];
};

export type Topic = {
	prettyName: string;
	name: string;
	svelte?: typeof import('*.md').default;
	feature?: number;
	icon?: string;
};

export const courses: Course[] = [
	{
		prettyName: 'Computer Science',
		name: 'computer-science',
		color: '#f94144',
		topics: [
			{
				prettyName: 'Variables',
				name: 'variables',
				svelte: Variables,
				feature: 1,
				icon: 'variables'
			},
			{ prettyName: 'Data Types', name: 'data-types', svelte: DataTypes },
			{
				prettyName: 'Functions and Operators',
				name: 'functions-and-operators'
			},
			{ prettyName: 'Control Flow', name: 'control-flow' },
			{ prettyName: 'Data Structures', name: 'data-structures' },
			{ prettyName: 'Static Type Checking', name: 'static-type-checking' },
			{ prettyName: 'Functional Programming', name: 'functional-programming' }
		]
	},
	{
		prettyName: 'Physics',
		name: 'physics',
		color: '#f3722c',
		topics: [
			{
				prettyName: 'Simple Harmonic Motion',
				name: 'simple-harmonic-motion',
				svelte: Smh,
				feature: 0,
				icon: 'simple-harmonic-motion'
			},
			{
				prettyName: 'Momentum',
				name: 'momentum',
				svelte: Momentum,
				feature: 2.5,
				icon: 'momentum'
			},
			{
				prettyName: 'Angular Momentum',
				name: 'angular-momentum',
				svelte: AngularMomentum,
				icon: 'angular-momentum'
			},
			{ prettyName: 'Electrostatics', name: 'electrostatics' },
			{ prettyName: 'Capacitors', name: 'capacitors' }
		]
	},
	{
		prettyName: 'Linear Algebra',
		name: 'linear-algebra',
		color: '#f9c74f',
		topics: [{ prettyName: 'Lorem ipsum', name: 'lorem-ipsum' }]
	},
	{
		prettyName: 'Chemistry',
		name: 'chemistry',
		color: '#90be6d',
		topics: [{ prettyName: 'Lorem ipsum', name: 'lorem-ipsum' }]
	},
	{
		prettyName: 'Calculus',
		name: 'calculus',
		color: '#43aa8b',
		topics: [
			{ prettyName: 'Limits', name: 'limits', feature: 2, icon: 'limits' },
			{ prettyName: 'Differentiation', name: 'differentiation' },
			{ prettyName: 'Integration', name: 'integration' },
			{ prettyName: 'Maxima', name: 'maxima' },
			{ prettyName: 'Sequences and Series', name: 'sequences-and-series' },
			{ prettyName: 'Curl', name: 'curl', svelte: Curl, feature: 3, icon: 'curl' },
			{ prettyName: 'Divergence', name: 'divergence' },
			{ prettyName: 'Gradient', name: 'gradient' },
			{ prettyName: "Green's Theorem", name: 'greens-theorem' }
		]
	},
	// {
	// 	prettyName: 'Vector Caclulus',
	// 	name: 'vector-calculus',
	// 	color: '#577590',
	// 	topics: [
	// 		{ prettyName: 'Curl', name: 'curl', svelte: Curl, feature: 3, icon: 'curl' },
	// 		{ prettyName: 'Divergence', name: 'divergence' },
	// 		{ prettyName: 'Gradient', name: 'gradient' },
	// 		{ prettyName: "Green's Theorem", name: 'greens-theorem' }
	// 	]
	// }
	{
		prettyName: 'Foundations',
		name: 'foundations',
		color: '#205cbd',
		topics: [
			{ prettyName: 'Asymptotic Notation', name: 'asymptotic-notation' },
			{ prettyName: 'Loop Analysis', name: 'loop-analysis' },
			{ prettyName: 'Recurrence Relations', name: 'recurrence-relations' },
			{ prettyName: 'Probabilistic Analysis', name: 'probabilistic-analysis' },
			{ prettyName: 'Quick Sort', name: 'quick-sort' },
			{ prettyName: 'Hashing', name: 'hashing' },
			{ prettyName: 'Table Doubling', name: 'table-doubling' },
			{ prettyName: 'Heaps and Data Structures', name: 'heaps-and-data-structures' },
			{ prettyName: 'Binary Search Trees', name: 'binary-search-trees' },
			{ prettyName: 'Red Black Trees', name: 'red-black-trees' },
			{ prettyName: 'Graph Algorithms', name: 'graph-algorithms', svelte: GraphAlgorithms },
			{ prettyName: 'Greedy Graph Algorithms', name: 'greedy-graph-algorithms' },
			{ prettyName: 'Union Find', name: 'union-find' },
			{ prettyName: 'NP Completeness', name: 'np-completeness' },
			{ prettyName: 'Dynamic Programming', name: 'dynamic-programming' }
		]
	},
	{
		prettyName: 'Interactive Systems',
		name: 'interactive-systems',
		color: '#0d8000',
		topics: [
			{
				prettyName: 'Sweep Line Collision Detection',
				name: 'sweep-line',
				svelte: SweepLine
			}
		]
	},
	{
		prettyName: 'Discrete Math',
		name: 'discrete-math',
		color: '#577590',
		topics: [
			{
				prettyName: 'Set Theory',
				name: 'set-theory',
				svelte: SetTheory,
				icon: 'set-theory'
			},
			{
				prettyName: 'Graph Theory',
				name: 'graph-theory',
				svelte: GraphTheory,
				icon: 'graphs',
				feature: 3
			},
			{
				prettyName: 'Logic',
				name: 'logic',
				svelte: SetTheory,
				icon: 'logic'
			}
		]
	}
];

export const svgs = import.meta.glob('./icons/*.svg', { as: 'raw' });
