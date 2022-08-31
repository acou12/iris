/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare module '*.md' {
	import type { SvelteComponentDev } from 'svelte/internal';

	export default class Comp extends SvelteComponentDev {
		$$prop_def: {};
	}
	export const metadata: Record<string, any>;
}
