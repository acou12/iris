<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { courses } from '$lib/courses';
	import type { Course } from '$lib/courses';

	export const load: Load = async ({ params, fetch, session, stuff }) => {
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
	import '$lib/styles/global.scss';

	export let course: Course;
	const topics = course.topics!;
</script>

<div class="header" style="background-color: {course.color}">
	<h1 class="title">{course.prettyName}</h1>
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
			<a href="/{course.name}/{topic.name}">
				<div class="topic" style="background-color: {course.color}">
					<h2>{topic.prettyName}</h2>
				</div>
			</a>
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

	.content {
		padding: 30px;
		max-width: 1300px;
		margin: auto;
	}

	@media (min-width: 900px) {
		.topics {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.topics {
		a {
			text-decoration: none;
		}
	}

	.topic {
		color: white;
		margin: 10px;
		padding: 10px;
		padding-bottom: 50px;
		border-radius: 8px;
	}
</style>
