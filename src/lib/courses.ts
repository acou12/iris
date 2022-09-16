// todo: fix
import Variables from '$lib/content/computer-science/variables/variables.md';
import DataTypes from '$lib/content/computer-science/data-types/data-types.md';
import AngularMomentum from '$lib/content/physics/angular-momentum/angular-momentum.md';
import Momentum from '$lib/content/physics/momentum/momentum.md';
import Smh from '$lib/content/physics/shm/simple-harmonic-motion.md';
import Curl from '$lib/content/vector-calc/curl/curl.md';

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
				icon: '/icons/variables.svg'
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
				icon: '/icons/simple-harmonic-motion.svg'
			},
			{
				prettyName: 'Momentum',
				name: 'momentum',
				svelte: Momentum,
				feature: 2.5,
				icon: '/icons/momentum.svg'
			},
			{
				prettyName: 'Angular Momentum',
				name: 'angular-momentum',
				svelte: AngularMomentum,
				icon: '/icons/angular-momentum.svg'
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
			{ prettyName: 'Limits', name: 'limits', feature: 2, icon: '/icons/limits.svg' },
			{ prettyName: 'Differentiation', name: 'differentiation' },
			{ prettyName: 'Integration', name: 'integration' },
			{ prettyName: 'Maxima', name: 'maxima' },
			{ prettyName: 'Sequences and Series', name: 'sequences-and-series' }
		]
	},
	{
		prettyName: 'Vector Caclulus',
		name: 'vector-calculus',
		color: '#577590',
		topics: [
			{ prettyName: 'Curl', name: 'curl', svelte: Curl, feature: 3, icon: '/icons/curl.svg' },
			{ prettyName: 'Divergence', name: 'divergence' },
			{ prettyName: 'Gradient', name: 'gradient' },
			{ prettyName: "Green's Theorem", name: 'greens-theorem' }
		]
	}
];
