import AngularMomentum from '$lib/content/physics/angular-momentum/angular-momentum.md';
import Momentum from '$lib/content/physics/momentum/momentum.md';
import Smh from '$lib/content/physics/shm/simple-harmonic-motion.md';
import GraphAlgorithms from '$lib/content/algorithms/graph-algorithms/graph-algorithms.md';
import Dictionaries from '$lib/content/algorithms/dictionary/dictionary-outline.md';
// import GreedyGraphAlgorithms from '$lib/content/algorithms/greedy-graph-algorithms/greedy-graph-algorithms.md';
import SweepLine from '$lib/content/interactive-systems/sweep-line.md';
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
		prettyName: 'Algorithms',
		name: 'algorithms',
		color: '#f94144',
		topics: [
			{
				prettyName: 'Dictionaries',
				name: 'dictionary',
				svelte: Dictionaries,
				icon: 'dictionary'
			},
			{
				prettyName: 'Graph Algorithms',
				name: 'graph-algorithms',
				svelte: GraphAlgorithms,
				feature: 0,
				icon: 'graph-algorithms'
			}
			// {
			// 	prettyName: 'Greedy Graph Algorithms',
			// 	name: 'greedy-graph-algorithms',
			// 	svelte: GreedyGraphAlgorithms
			// }
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
				feature: 1,
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
		prettyName: 'Engineering',
		name: 'engineering',
		color: '#f9c74f',
		topics: []
	},
	{
		prettyName: 'Chemistry',
		name: 'chemistry',
		color: '#90be6d',
		topics: []
	},
	{
		prettyName: 'Mathematics',
		name: 'mathematics',
		color: '#43aa8b',
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
				feature: 4
			},
			{
				prettyName: 'Logic',
				name: 'logic',
				svelte: SetTheory,
				icon: 'logic'
			}
		]
	},
	{
		prettyName: 'Interactive Systems',
		name: 'interactive-systems',
		color: '#bf81ea',
		topics: [
			{
				prettyName: 'Sweep Line Collision Detection',
				name: 'sweep-line',
				feature: 3,
				svelte: SweepLine
			}
		]
	}
];

export const svgs = import.meta.glob('./icons/*.svg', { as: 'raw' });
