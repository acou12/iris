import { page } from '$app/stores';
import { onDestroy, onMount } from 'svelte';

export const onNavigate = (whatever: () => void, after: () => void) => {
	let mounted = false;

	const unsubscribe = page.subscribe(() => {
		if (mounted) {
			after();
			whatever();
		}
	});

	onMount(() => {
		mounted = true;
		whatever();

		return () => {
			unsubscribe();
			mounted = false;
		};
	});
};

import type * as PIXI from 'pixi.js';
import type { Application, Ticker } from 'pixi.js';

export const withPixi = async (f: (pixi: typeof PIXI) => Promise<[Application, Ticker]>) => {
	let stop: () => void;
	onNavigate(async () => {
		const pixi = await import('pixi.js');
		const [app, ticker] = await f(pixi);
		stop = () => {
			app.destroy();
			ticker.stop();
			console.log('PWNED!');
		};
	}, stop);
	onDestroy(() => {
		stop?.();
	});
};
