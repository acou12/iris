<script>
	import Kb from '$lib/util/KatexBlock.svelte';
	import Kl from '$lib/util/KatexInline.svelte';
	import SpringMass from '$lib/content/physics/shm/spring-mass.svelte';
	import Pendulum from './pendulum.svelte';
	import PendulumFBD from './pendulum-fbd.svelte';
</script>

## What is Simple Harmonic Motion?

Simple harmonic motion is a very specific type of harmonic motion that occurs when an object moves sinusoidally, or like a sine wave. In order for a force to produce harmonic motion, there are two criteria necessary:

- The force is pointing towards equilibrium (that is, it's a **restoring force**); and
- The force is directly proportional to the displacement from equilibrium.

To demonstrate, let's start with one of the simplest examples of simple harmonic motion: a spring-mass sytem.

## Spring-Mass System

Recall that Hookean springs obey (by definition) Hooke's Law:

$$
\vec F_s = -k \vec x \tag{1}
$$

This meets our critera for simple harmonic motion; the spring force is proportional to the displacement and is a restoring force (as indicated by the negative sign). Thus, we expected the spring to move sinusoidally. A demo of such a system is shown below.

<SpringMass />

Now, let's try to derive the position of the mass at any given time during its oscillation. First, we start with Hooke's law and write it in acceleration rather than force. To simplify things, we'll assume the spring is moving along the x-axis so we can remove the vector signs, but this solution applies to any spring-mass system moving in a line.

$$
F = -kx \\
ma = -kx \\
m(x'') = -kx \\
x'' = -\frac km x \tag{2}
$$

To make things even more simple, we define a constant $\omega^2 = \frac km$ which makes our acceleration,

$$
x'' = -\omega^2 x
$$

At first it may be confusing why we're defining $\omega^2$ instead of $\omega$, but this will be explained later.

The solution to this differential equation is one that is proportional to its own second derivative. Looking at this long enough, you might realize that the trigonometric functions have this property. For example, for sine,

$$
(\sin(x))' = \cos(x) \\
(\cos(x))' = -\sin(x)
$$

However, this is not the solution because it omits the $\omega^2$ in our equation, so we can try the second derivative of a sine with a multiplicative factor on x using the chain rule.

$$
(\sin(ax))' = a\cos(ax) \\ (a\cos(ax))' = -a^2\sin(ax)
$$

This is exactly what we're looking for, and you may begin to understand why we used $\omega^2$ as our constant of proportionality. One more thing to note is that we could have added any constants outside the sin and added to the $x$ that would still satisfy the equation, as a consequence of the chain rule. For example,

$$
(7\sin(ax + 6))' = 7a\cos(ax + 6) \\ (7a\cos(ax + 6))' = -7a^2\sin(ax + 6)
$$

So our general solution should reflect this freedom:

$$
x = A\cos(\omega t + \phi)
$$

We call $A$ the **amplitude**, $\omega$ the **angular velocity**, and $\phi$ the **phase constant**.

## The Pendulum

Now we focus our attention onto another device that is commonly used to demonstrate simple harmonic motion, the pendulum. A simple pendulum consists of a mass attatched to a string; when dropped, it begins to oscillate due to the force of gravity.

<Pendulum />

Let's create a free-body diagram to analyze the net acceleration of the pendulum.

## Force Approach

<PendulumFBD />

At all times, gravity is pulling down on the mass with a force $F_g = mg$ in the downwards direction. However, depending on the angle of the pendulum, some of this force is direction directly outwards, and is counteracted by the force of tension. The only component of the force of gravity that is causing acceleration is tangential.

_Sidenote: in the following derivation, the centripetal force and acceleration are ignored, as they do not contribute to the change in speed of the pendulum, but keep in mind that these are still acting. Centripetal acceleration is keeping the bob on the path, but gravity is the one causing its speed to change._

Using the geometry of the problem, we can find that the tangential component of force $F_t = -mg\sin\theta$. Now we can follow a similar reasoning as for the spring-mass system.

$$
F_t = -mg\sin\theta \\
ma_t = -mg\sin\theta \\
a_t = -g\sin\theta \\
a_t = \ell\alpha = \ell\theta'' = -g\sin\theta \\
\theta'' = -\frac g\ell\sin\theta
$$

As you can see, the force is not directly proportional to the displacement, but rather the sine of the displacement. Thus, **in general, a pendulum does not undergo simple harmonic motion**. However, we can model the pendulum with simple harmonic motion if theta stays relatively small. For small angles (on the order of $\pi / 8$), we can say that $\sin \theta \approx \theta$. This approximation can be seen by observing the taylor series for $\sin \theta$:

$$
\sin\theta = \sum_{n=0}^\infty \sin^{(n)}(0) {\theta^n \over n! } = \theta - {\theta^3 \over 3!} + {\theta^5 \over 5!} - \dots
$$

For small $\theta$, the second term forward is very small and can be neglected. Using the substitution $\sin\theta \approx \theta$, our updated diffrential is

$$
\theta'' = -\frac g\ell\theta \tag 3
$$

Now we follow the same reasoning as the spring mass sytem, letting $\omega^2 = \frac g\ell$.

$$
\theta'' = -\omega^2\theta \\
$$

<!-- $$
f \overset\text{def}= \underbrace{\omega}_\text{rad/s} \cdot \underbrace{\frac1{2\pi}}_\text{rev/rad} \\
$$ -->

<!-- TODO:
- make equations tolerable ✓
- mdx ✓
- pixi subframework
- cool subject backgrounds
-->
