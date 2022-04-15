export type Course = {
	prettyName: string;
	name: string;
	color: string;
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
		color: '#f3722c'
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
		prettyName: 'Calculus',
		name: 'calculus',
		color: '#577590'
	}
];
