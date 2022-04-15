<script lang="ts">
	import '$lib/styles/global.scss';
	import { courses } from '$lib/courses';
</script>

<div class="logo-wrapper">
	<img class="logo" src="/iris.svg" alt="Iris" />
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
		{#each courses as c}
			<a href="/{c.name}"
				><div class="course" style="background-color: {c.color}"><h2>{c.prettyName}</h2></div></a
			>
		{/each}
	</div>
</div>

<style lang="scss">
	.logo-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #222;
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
	}

	.course {
		color: white;
		margin: 10px;
		padding: 10px;
		padding-bottom: 50px;
		border-radius: 8px;
	}
</style>
