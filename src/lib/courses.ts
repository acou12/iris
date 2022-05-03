import Smh from '$lib/content/physics/shm/simple-harmonic-motion.md';
import Momentum from '$lib/content/physics/momentum/momentum.md';

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
		color: '#f94144'
	},
	{
		prettyName: 'Physics',
		name: 'physics',
		color: '#f3722c',
		topics: [
			{ prettyName: 'Simple Harmonic Motion', name: 'simple-harmonic-motion', svelte: Smh },
			{ prettyName: 'Capacitors', name: 'capacitors' },
			{ prettyName: 'Angular Momentum', name: 'angular-momentum' },
			{ prettyName: 'Momentum', name: 'momentum', svelte: Momentum },
			{ prettyName: 'Electrostatics', name: 'electrostatics' }
		]
	},
	{
		prettyName: 'Linear Algebra',
		name: 'linear-algebra',
		color: '#f9c74f'
	},
	{
		prettyName: 'Chemistry',
		name: 'chemistry',
		color: '#90be6d'
	},
	{
		prettyName: 'Biology',
		name: 'biology',
		color: '#43aa8b'
	},
	{
		prettyName: 'Vector Caclulus',
		name: 'vector-calculus',
		color: '#577590',
		topics: [
			{ prettyName: 'Curl', name: 'curl' },
			{ prettyName: 'Divergence', name: 'divergence' },
			{ prettyName: 'Gradient', name: 'gradient' },
			{ prettyName: "Green's Theorem", name: 'greens-theorem' }
		]
	}
];
