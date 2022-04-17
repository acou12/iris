<script>
	import Kb from '$lib/util/KatexBlock.svelte';
	import Kl from '$lib/util/KatexInline.svelte';
	import SpringMass from '$lib/content/physics/shm/spring-mass.svelte';
	import Pendulum from './pendulum.svelte';
	import PendulumFBD from './pendulum-fbd.svelte';
</script>

<h2>What is Simple Harmonic Motion?</h2>

<p>
	Simple harmonic motion is a very specific type of harmonic motion that occurs when an object moves
	sinusoidally, or like a sine wave. In order for a force to produce harmonic motion, there are two
	criteria necessary:
</p>
<ul>
	<li>
		The force is pointing towards equilibrium (that is, it's a <b>restoring force</b>); and
	</li>
	<li>The force is directly proportional to the displacement from equilibrium.</li>
</ul>
<p>
	To demonstrate, let's start with one of the simplest examples of simple harmonic motion: a
	spring-mass sytem.
</p>

<h2>Spring-Mass System</h2>

<p>Recall that Hookean springs obey (by definition) Hooke's Law:</p>

<Kb math="\vec F_s = -k \vec x \tag{'{1}'}" />

<p>
	This meets our critera for simple harmonic motion; the spring force is proportional to the
	displacement and is a restoring force (as indicated by the negative sign). Thus, we expected the
	spring to move sinusoidally. A demo of such a system is shown below.
</p>

<SpringMass />

<p>
	Now, let's try to derive the position of the mass at any given time during its oscillation. First,
	we start with Hooke's law and write it in terms of acceleration rather than force. To simplify
	things, we'll assume the spring is moving along the x-axis so we can remove the vector signs, but
	this solution applies to any spring-mass system moving in a line.
</p>

<Kb math="F = -kx \\ ma = -kx \\ m(x'') = -kx \\ x'' = -\frac km x \tag{'{2}'}" />

<p>
	<!-- There's got to be a better way to do this... -->
	To make things even more simple, we define a constant <Kl math={'\\omega^2 = \\frac km'} />, which
	makes our acceleration,
</p>

<Kb math="x'' = -\omega^2 x" />

<p>
	<i>
		At first it may be confusing why we're defining <Kl math="\omega^2" /> instead of <Kl
			math="\omega"
		/>, but this will be explained later.
	</i>
</p>

<p>
	The solution to this differential equation is one that is proportional to its own second
	derivative. Looking at this long enough, you might realize that the trigonometric functions have
	this property. For example, for sine,
</p>

<Kb math="(\sin(x))' = \cos(x) \\ (\cos(x))' = -\sin(x)" />

<p>
	However, this is not the solution because it omits the <Kl math="\omega^2" /> in our equation, so we
	can try the second derivative of a sine with a multiplicative factor on x using the chain rule.
</p>

<Kb math="(\sin(ax))' = a\cos(ax) \\ (a\cos(ax))' = -a^2\sin(ax)" />

<p>
	This is exactly what we're looking for, and you may begin to understand why we used <Kl
		math="\omega^2"
	/> as our constant of proportionality. One more thing to note is that at any step during the differentiation,
	we could have added a constant that would have had no effect. For example,
</p>

<Kb math="(\sin(ax + 2) + 8)' = a\cos(ax + 2) \\ (a\cos(ax + 2))' = -a^2\sin(ax + 2)" />

<p>So our general solution should reflect this freedom:</p>

<div class="highlight">
	<Kb math="x = \cos(\omega t + \phi) + x_0" />
</div>

<p>
	We call <Kl math="\omega" /> the <b>angular velocity</b> and <Kl math="\phi" /> the
	<b>phase constant</b>, and <Kl math="x_0" /> is simply the initial displacement.
</p>

<h2>The Pendulum</h2>

<p>
	Now we focus our attention onto another device that is commonly used to demonstrate simple
	harmonic motion, the pendulum. A simple pendulum consists of a mass attatched to a string; when
	dropped, it begins to oscillate due to the force of gravity.
</p>

<Pendulum />

<p>Let's create a free-body diagram to analyze the net acceleration of the pendulum.</p>

<h3>Force Approach</h3>

<PendulumFBD />

<p>
	At all times, gravity is pulling down on the mass with a force <Kl math="F_g = mg" /> in the downwards
	direction. However, depending on the angle of the pendulum, some of this force is direction directly
	outwards, and is counteracted by the force of tension. The only component of the force of gravity that
	is causing acceleration is tangential.
</p>
<p>
	<i>
		Sidenote: in the following derivation, the centripetal force and acceleration are ignored, as
		they do not contribute to the change in speed of the pendulum, but keep in mind that these are
		still acting. Centripetal acceleration is keeping the bob on the path, but gravity is the one
		causing its speed to change.
	</i>
</p>

<p>
	Using the geometry of the problem, we can find that the tangential component of force <Kl
		math="F_t = -mg\sin\theta"
	/>. Now we can follow a similar reasoning as for the spring-mass system.
</p>

<Kb
	math="F_t = -mg\sin\theta \\ ma_t = -mg\sin\theta \\ a_t = -g\sin\theta \\ a_t = \ell\alpha = \ell\theta'' = -g\sin\theta \\ \theta'' = -\frac g\ell\sin\theta \tag 3"
/>

<p>
	As you can see, the force is not directly proportional to the displacement, but rather the sine of
	the displacement. Thus, <b>in general, a pendulum does not undergo simple harmonic motion</b>.
	However, we can model the pendulum with simple harmonic motion if theta stays relatively small.
	For small angles (on the order of <Kl math="\pi / 8" />), we can say that <Kl
		math="\sin \theta \approx \theta"
	/>. This approximation can be seen by observing the taylor series for <Kl math="\sin \theta" />:
</p>

<Kb
	math="\sin\theta = \sum_{'{n=0}'}^\infty \sin^{'{(n)}(0) {\\theta^n \\over n! } = \\theta - {\\theta^3 \\over 3!} + {\\theta^5 \\over 5!} - \\dots'}"
/>

<!-- TODO:
	- make equations tolerable
	- mdx
	- pixi subframework
	- cool subject backgrounds
 -->
