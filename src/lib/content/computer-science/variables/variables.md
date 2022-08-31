# Variables

In this course, we'll be talking about **variables**. You can think of variables as boxes with values in them.

```typescript
export const load: Load = async ({ params }) => {
	const { course: courseName } = params;
	const course = courses.find((it) => it.name == courseName);
	if (!course) {
		return {
			status: 404
		};
	}
	return {
		status: 200,
		props: {
			course
		}
	};
};
```
