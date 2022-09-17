<script lang="ts">
	import '$lib/styles/global.scss';
	import { courses } from '$lib/courses';
	import IrisButton from '$lib/components/IrisButton.svelte';
</script>

<svelte:head>
	<title>Iris Home</title>
</svelte:head>
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
			<IrisButton href="/{course.name}" color={course.color}>
				<h2>{course.prettyName}</h2>
			</IrisButton>
		{/each}
	</div>
	<h1>Featured Articles</h1>
	<div class="featured-artices">
		{#each courses
			.flatMap((c) => c.topics.map((t) => ({ ...t, parent: c })))
			.filter((t) => t.feature !== undefined)
			.sort((t, u) => t.feature - u.feature) as topic}
			<IrisButton
				href="/{topic.parent.name}/{topic.name}"
				color={topic.parent.color}
				icon={topic.icon}
			>
				<h2>{topic.prettyName}</h2>
				<!-- <p>
					This is the description. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
					adipisci ipsa pariatur animi enim consequatur alias deserunt maxime quas quis molestias
					laboriosam quod explicabo, temporibus saepe unde!
				</p> -->
			</IrisButton>
		{/each}
	</div>
</div>

<style lang="scss">
	.logo-wrapper {
		height: 60vw;
	}

	.logo {
		width: 70%;
	}

	.content {
		max-width: 1400px;
		padding: 35px;
		margin: auto;
	}

	@media (min-width: 900px) {
		.courses {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.courses {
		margin-bottom: 32px;
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
	}
</style>
