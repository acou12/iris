<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { courses } from '$lib/courses';
	import type { Course } from '$lib/courses';

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
</script>

<script lang="ts">
	import IrisButton from '$lib/components/IrisButton.svelte';
	import '$lib/styles/global.scss';
	import { lightenColor, lighterenColor } from '$lib/util/color';

	export let course: Course;
	const topics = course.topics ?? [];

	const background = `linear-gradient(to right, ${course.color}, ${lightenColor(course.color)})`;
</script>

<svelte:head>
	<title>
		{course.prettyName}
	</title>
</svelte:head>
<div class="header" style="background: {background}">
	<div class="header-content">
		<span class="backlinks" style="color: {lighterenColor(course.color)}">
			<a href="/">Home</a>
		</span>
		<h1>{course.prettyName}</h1>
	</div>
</div>
<div class="content">
	<h1>Welcome to {course.prettyName}!</h1>
	<p>
		This is the page for all things {course.prettyName}. Lorem ipsum dolor sit amet consectetur
		adipisicing elit. Aut rerum beatae, saepe asperiores veniam cupiditate recusandae, autem natus
		quia facilis nobis neque modi molestiae repudiandae! Voluptate explicabo repellat accusamus
		fugiat? Optio, corporis beatae vero quas excepturi amet minus unde placeat veniam impedit animi
		odio quis saepe consectetur dolore fuga earum, illo error dignissimos? Beatae qui ab earum vitae
		unde velit! Minima, quisquam iure excepturi autem veniam itaque placeat rerum, quae dolorum
		deleniti dignissimos laborum perferendis voluptatibus quos sit nihil neque. Fugiat laboriosam
		veniam ut ratione, aperiam nihil perspiciatis itaque asperiores!
	</p>
	<div class="topics">
		{#each topics as topic}
			<IrisButton href="/{course.name}/{topic.name}" color={course.color} icon={topic.icon}>
				<h2>{topic.prettyName}</h2>
			</IrisButton>
		{/each}
	</div>
</div>

<style lang="scss">
	.header {
		h1 {
			@media (max-width: 900px) {
				margin-top: 0;
			}
			max-width: 1300px;
			margin: auto;
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
			color: inherit;
			&:hover {
				text-decoration: solid underline 3px;
			}
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

	.topics {
		a {
			text-decoration: none;
		}
	}
</style>
