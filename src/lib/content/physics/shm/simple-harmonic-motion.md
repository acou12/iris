<script>
	import Kb from '$lib/util/KatexBlock.svelte';
	import Kl from '$lib/util/KatexInline.svelte';
	import SpringMass from '$lib/content/physics/shm/spring-mass.svelte';
	import Pendulum from './pendulum.svelte';
	import PendulumFBD from './pendulum-fbd.svelte';
	import SpringMassAmplitude from './spring-mass-amplitude.svelte'
	import SpringMassFrequency from './spring-mass-frequency.svelte'
	import SpringMassPhase from './spring-mass-phase.svelte'
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

The function of position we're looking for has the property that it is proportional to its own negative second derivative. Particularly, the trigonometric functions sine and cosine have this property:

$$
(\sin t)'' = (\cos t)' = -\sin t \\
(\cos t)'' = (-\sin t)' = -\cos t \\
$$

_Although this is an ordinary differential equation that could be solved directly, it's beyond the scope of this article. See [other article](/other-article) for more details on the specific procedure involved to solve this type of differential equation._

Either one will work fine, but $\cos$ is usually used out of convenience, since it models a spring mass system that starts at equillibirum. However, just $\cos t$ itself isn't quite right, as it doesn't account for our constant of proportionality $\frac km$. To get an intuition for the general form of a position vs time function, let's consider how different spring mass systems could differ from each other.

First off, releasing the masses from different distances from equillibrium will lead to a spring-mass system that goes further out in both directions, as seen below.

<SpringMassAmplitude />

This maximum distance from equilibrium is known as the **amplitude** and is given the symbol **A**. Our current function, $\cos t$, has a maximum and minimum of 1 and -1, but we can multiply it by A to get a function that has a max and min of A and -A.

$$
x = A\cos(t)
$$

There are also factors that could affect the general speed of oscillation. For example, if the mass is heavier, it will resist the spring force more, and so will oscillate slower than a lighter mass. The spring constant also affects the speed of oscillation; if a spring is more "stiff", it will oscillate faster.

<SpringMassFrequency />

This oscillation speed is represented as $\omega$ and is often referred to as the **angular frequency**. In our position function, it is multiplied by time:

$$
x = A\cos(\omega t)
$$

Finally, we need to consider that the system is not always at equilibrium at $t = 0$; it could already have an initial velocity.

<SpringMassPhase />

The above three springs are all identical other than the fact that they are offset but some amount of time. To represent this offset in our position function, we use $\phi$, called the **phase constant**.

$$
x = A\cos(\omega t + \phi)
$$

This is the general form for the position of a simple harmonic oscillator.

## Velocity and acceleration

Since we have a closed form for the position, we can simply differentiate with respect to time to find the velocity and acceleration as well.

$$
v = {dx \over dt} = {d \over dt}\left(A\cos(\omega t + \phi)\right) = -A\omega\sin(\omega t + \phi) \\
a = {dv \over dt} = {d \over dt}\left(-A\omega\sin(\omega t + \phi)\right) = -A\omega^2\cos(\omega t + \phi)
$$

If we rearrange the expression for acceleration, we can confirm that this is in fact a solution to equation $(2)$:

$$
\begin{aligned}
x'' = a &= -A\omega^2\cos(\omega t + \phi) \\
&= -\omega^2(A\cos(\omega t + \phi)) \\
&= -\omega^2(x) \\
x'' &= -\omega^2x
\end{aligned}
$$

with our constant of proportionality being $\omega^2$.

Although we derived this general function from a spring-mass system, it applies to any object in simple harmonic motion, with the constants $A$, $\omega$, and $\phi$ varying. For the spring mass sytem, we can solve for $\omega$ as follows:

$$
x'' = -\frac km x = -\omega^2 x \\
\omega^2 = \frac km \to
\omega = \sqrt \frac km
$$

<!-- To make things even more simple, we define a constant $\omega^2 = \frac km$ which makes our acceleration,

$$
x'' = -\omega^2 x
$$

At first it may be confusing why we're defining $\omega^2$ instead of $\omega$, but this will be explained later.

 This is a bad explanation. Instead of explaining mathematically it'd be better to derive the constants of integration from physical attributes of a simple harmonic oscillator, such as its amplitude, initial velocity, and period (which is directly related to the strength of the restoring force). Another more advanced section will explain the derivation using ODE methods.

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

We call $A$ the **amplitude**, $\omega$ the **angular velocity**, and $\phi$ the **phase constant**. -->

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

<!-- (this section should be ommitted for brevity and explained in more depth later) -->

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
