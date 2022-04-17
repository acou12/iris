<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { courses, type Topic } from '$lib/courses';
	import type { Course } from '$lib/courses';

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const { course: courseName, topic: topicName } = params;
		const course = courses.find((it) => it.name == courseName);
		const topic = course.topics.find((it) => it.name == topicName);
		if (!course || !topic) {
			return {
				status: 404
			};
		}
		return {
			status: 200,
			props: {
				course,
				topic
			}
		};
	};
</script>

<script lang="ts">
	import '$lib/styles/global.scss';

	export let course: Course;
	export let topic: Topic;
	const svelte = topic.svelte;
</script>

<div class="header" style="background-color: {course.color}">
	<div class="header-content">
		<span class="backlinks">
			<a href="/">Home</a> >
			<a href="/{course.name}">{course.prettyName}</a>
			>
			<a href="/{course.name}/{topic.name}">{topic.prettyName}</a>
		</span>
		<h1>{topic.prettyName}</h1>
	</div>
</div>
<div class="content">
	{#if svelte}
		<svelte:component this={svelte} />
	{/if}
</div>

<style lang="scss">
	.header {
		h1 {
			@media (max-width: 900px) {
				margin-top: 0;
			}
			margin-top: 50px;
			margin-bottom: 0px;
		}
		padding: 30px;
		padding-bottom: 50px;
		color: white;
	}

	.header-content {
		max-width: 1300px;
		margin: auto;
	}

	.backlinks {
		a {
			text-decoration: none;
			// todo: make it a ligher version of `color`, looks better
			color: white;
		}
		color: white;
		font-family: 'Outfit';
		text-transform: uppercase;
		font-size: 70%;
	}

	.content {
		padding: 30px;
		max-width: 1300px;
		margin: auto;
	}
</style>
