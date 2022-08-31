**Data types** represent different types of data you can store in a variable. In Typescript, this is done by specifying the type with a colon.

```typescript
const age: number = 26;
const name: string = 'John';
const children: string[] = ['Sam', 'Max'];

const formatted = (): string =>
	`${name} is ${age} years old, and has ${children.length} children, ` + children.join(', ');
```
