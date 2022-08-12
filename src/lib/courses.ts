// @ts-ignore (SAD)
import Smh from '$lib/content/physics/shm/simple-harmonic-motion.md';
// @ts-ignore (SAD)
import Momentum from '$lib/content/physics/momentum/momentum.md';
// @ts-ignore (SAD)
import Curl from '$lib/content/vector-calc/curl/curl.md';
// @ts-ignore (SAD)
import AngularMomentum from '$lib/content/physics/angular-momentum/angular-momentum.md';
// @ts-ignore (SAD)
import Placeholder from '$lib/content/placeholder.md';

export type Course = {
	prettyName: string;
	name: string;
	color: string;
	topics?: Topic[];
};

export type Topic = {
	prettyName: string;
	name: string;
	svelte?: any;
};

export const courses: Course[] = [
	{
		prettyName: 'Computer Science',
		name: 'computer-science',
		color: '#f94144',
		topics: [
			{ prettyName: 'Variables', name: 'variables', svelte: Placeholder },
			{ prettyName: 'Data Types', name: 'data-types', svelte: Smh },
			{ prettyName: 'Functions and Operators', name: 'functions-and-operators', svelte: Smh },
			{ prettyName: 'Control Flow', name: 'control-flow', svelte: Smh },
			{ prettyName: 'Data Structures', name: 'data-structures', svelte: Smh },
			{ prettyName: 'Static Type Checking', name: 'static-type-checking', svelte: Smh },
			{ prettyName: 'Functional Programming', name: 'functional-programming', svelte: Smh }
		]
	},
	{
		prettyName: 'Physics',
		name: 'physics',
		color: '#f3722c',
		topics: [
			{ prettyName: 'Simple Harmonic Motion', name: 'simple-harmonic-motion', svelte: Smh },
			{ prettyName: 'Capacitors', name: 'capacitors' },
			{ prettyName: 'Angular Momentum', name: 'angular-momentum', svelte: AngularMomentum },
			{ prettyName: 'Momentum', name: 'momentum', svelte: Momentum },
			{ prettyName: 'Electrostatics', name: 'electrostatics' }
		]
	},
	{
		prettyName: 'Linear Algebra',
		name: 'linear-algebra',
		color: '#f9c74f',
		topics: [
			{
				prettyName: 'Lorem ipsum',
				name: 'lorem-ipsum',
				svelte: Placeholder
			}
		]
	},
	{
		prettyName: 'Chemistry',
		name: 'chemistry',
		color: '#90be6d',
		topics: [
			{
				prettyName: 'Lorem ipsum',
				name: 'lorem-ipsum',
				svelte: Placeholder
			}
		]
	},
	{
		prettyName: 'Biology',
		name: 'biology',
		color: '#43aa8b',
		topics: [
			{
				prettyName: 'Lorem ipsum',
				name: 'lorem-ipsum',
				svelte: Placeholder
			}
		]
	},
	{
		prettyName: 'Vector Caclulus',
		name: 'vector-calculus',
		color: '#577590',
		topics: [
			{ prettyName: 'Curl', name: 'curl', svelte: Curl },
			{ prettyName: 'Divergence', name: 'divergence' },
			{ prettyName: 'Gradient', name: 'gradient' },
			{ prettyName: "Green's Theorem", name: 'greens-theorem' }
		]
	}
];
