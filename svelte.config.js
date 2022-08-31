import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

	kit: {
		vite: {
			plugins: [dynamicImportVars]
		},
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
