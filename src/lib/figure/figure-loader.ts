import { onMount } from 'svelte';
import { Figure } from './figure';

export const loadFigureOnMount = (figure: Figure) => {
	onMount(() => {
		let lastTime = 0;

		const tick = (time: number) => {
			let delta: number;
			if (lastTime > 0) {
				delta = (time - lastTime) / 1000;

				figure.update();
				figure.draw(delta);
			}

			lastTime = time;

			requestAnimationFrame(tick);
		};

		tick(0);
	});
};
