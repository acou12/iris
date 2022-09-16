<script lang="ts">
	import '$lib/styles/global.scss';
	import { courses } from '$lib/courses';
	import { irisButton } from '$lib/styles/emotion';
</script>

<div class="logo-wrapper">
	<img class="logo" src="/iris.svg" alt="The word Iris with a rainbow background." />
	<img class="spinner" src="/spinner.svg" alt="The iris spinner." />
</div>
<div class="content">
	<h1>What is Iris?</h1>
	<p>
		This is a cool paragraph. Something something soh-cah-toa something something. Lorem ipsum dolor
		sit, amet consectetur adipisicing elit. Ad autem laudantium sunt. Officia molestias temporibus,
		amet eveniet quidem porro odio vitae necessitatibus, saepe ipsum error reiciendis assumenda
		nobis esse sequi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nobis dolore,
		cupiditate hic recusandae ullam cum itaque quasi blanditiis. Ducimus minus quos ipsum alias
		laudantium optio tempore, ab numquam doloremque?
	</p>
	<h1>Courses</h1>
	<div class="courses">
		{#each courses as course}
			<a href="/{course.name}"
				><div class={'course ' + irisButton(course.color)}>
					<h2>{course.prettyName}</h2>
				</div></a
			>
		{/each}
	</div>
	<h1>Featured Articles</h1>
	<div class="featured-artices">
		{#each courses
			.flatMap((c) => c.topics.map((t) => ({ ...t, parent: c })))
			.filter((t) => t.feature !== undefined)
			.sort((t) => t.feature) as topic}
			<a href="/{topic.parent.name}/{topic.name}"
				><div class={'course ' + irisButton(topic.parent.color)}>
					<h2>{topic.prettyName}</h2>
				</div></a
			>
		{/each}
	</div>
</div>

<style lang="scss">
	.logo-wrapper {
		/* display: flex; */
		/* justify-content: center; */
		/* align-items: center; */
		height: 60vw;
		/* background-color: #222; */
	}

	.logo {
		width: 70%;
	}

	.content {
		padding: 30px;
	}

	@media (min-width: 900px) {
		.courses {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.courses {
		a {
			text-decoration: none;
		}
		margin-bottom: 32px;
	}

	.featured-artices {
		a {
			text-decoration: none;
		}
	}

	.course {
		color: white;
		margin: 10px;
		padding: 10px;
		padding-bottom: 50px;
		border-radius: 8px;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.spinner {
		position: absolute;
		left: -50vw;
		top: -20vw;
		width: 80vw;
		animation: spin 30s infinite linear;
	}

	.logo {
		position: absolute;
		left: 30vw;
		top: 30vh;
		height: 40vh;
		/* animation: spin 30s infinite linear; */
	}
</style>
