import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter({
			assets: 'dist',
			pages: 'dist'
		}),

		// browser: {
		// 	router: false
		// },

		prerender: {
			default: true
		}
	}
};

export default config;
