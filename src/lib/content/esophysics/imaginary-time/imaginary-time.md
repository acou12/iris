<script>
    import ImaginaryTime from './ImaginaryTime.svelte'
</script>

## Introduction

First, start by defining a standard kinematics problem: a ball is falling from some position with a constant acceleration (gravity). Let $y(0) = 10$ and $g=1$, directed in the negative y direction.

Then, position is

$$
y(t) = 10 - \frac 12t^2
$$

**Proof.** This is obvious. $\blacksquare$

<ImaginaryTime/>

Now, consider the following: at what time does the ball reach $y=5$? We can easily solve for $t$ as follows:

$$
5=10 - \frac 12 t^2 \\
5 = \frac 12 t^2 \\
t = \sqrt{10}
$$

Now consider the similar (but fundamentally different) question: at what time does the ball reach $y=15$? Classically, this question is nonsense: the ball starts with its maximum potential energy at $t = 0 \to y = 10$, so any higher elevation would require an external force. However, naively attempting to solve the question in a manner similar to the previous question reveals an interesting idea.

$$
15 = 10 - \frac 12 t^2 \\
-5 = \frac 12 t^2 \\
-10 = t^2 \\
t = \sqrt{-10} = i\sqrt{10}
$$

What if the value of $t$ was extended to the complex plane? As shown in the previous problem, this allows us to reach classically impossible positions.

## Notes

- in imaginary plane, gravity is repulsive
- ~~everything is anti-everything~~
- positive and negative repel
- likes attract
- $x^2$ is now negative always
- $\int\vec F \cdot d\vec r$

$$
i^2=-1 \\
(xi)^2=x^2(i^2)=-(x^2) \\
$$

$$
(xi)^3=x^3i^3=x^3i^2i=-x^3i
$$

$$
t=i+1 \\
y=10-\frac12(i+1)^2=10-i
$$

$$
\text{Real position: }\langle x_r, y_r, z_r \rangle \\
\text{Imaginary position: }i\langle x_i, y_i, z_i \rangle
$$

We're used to thinking about time linearly, but in order to extend it to the complex plane, we'll define a parameterization called **metatime**, denoted with $\tau$. For example, when moving through the imaginary axis, we can define $t = i\tau$, and the y-axis of our ball becomes

$$
y = \frac 12t^2=\frac 12 (i \tau)^2 = -\frac 12 \tau^2
$$

This reveals one of the most important facts about complex time: In the imaginary direction, most forces are directed in the opposite direction as in real direction. As metatime, increases, the ball appears to fly away from the earth at an increasingly fast rate. As the ball gets further from the earth, two force between the two decreases, so this does not violate the conservation of energy; however, the ball clearly has much more energy using this parameterization. In order to reconcile this fact, we'll have to look at the complex counterpart to the driver of energy, forces.

## Complex Forces

Classically, force is defined as the rate of change of momentum, as documented by Newton.

$$
\vec F = {d\vec p \over dt}
$$

We can substitute our parameterization.

$$
\vec F = {d \vec p \over d(i\tau)} =-i{d\vec p \over d\tau}
$$

Without worrying about this too much, let's try to calculate Newton's Law of Universal Gravitation. (We once again simplify the expression with $G = 1$.)

$$
\vec F_g = {Mm \over r^2} = -i{d\vec p \over d\tau}=-ima_\tau \\
a_\tau = i{M \over r^2} \\
\int a_\tau d\tau = \int i{M \over r^2} d\tau \\
v_\tau = i\tau{M \over r^2}
$$

...

$$
a_t=\frac {dv}{dt}=-i\frac{dv}{d\tau} =-ia_\tau\\
v=\frac {dy}{dt}=-i\frac{dy}{d\tau} \\
F=ma=m\frac{dv}{dt}=-im\frac{dv}{d\tau} \\
\int F d\tau = \int -im\frac{dv}{{d\tau}} {d\tau} \\
F\tau=-imv_t=-im(-iv_\tau)=-mv_\tau \\
\frac{F}{m}\tau=-v_\tau \\
-\frac{F}{m}\tau=v_\tau ={dy \over d\tau}\\
-\int{\frac{F}{m}}\tau \;d\tau= \int{dy \over \cancel{d\tau}} \cancel{d\tau}\\
y=-\frac{F}{2m}\tau^2=-\frac{1}{2}a\tau^2
$$

A derivation of this is as follows:

$$
\boxed{t=i\tau} \\
dt=id\tau \\
\frac{1}{dt}=\frac1{id\tau} \\
\frac1i=-i \\
\frac{1}{dt}=-i\frac1{d\tau} \\
$$

$$
U=-\int \vec F \cdot d \vec r \\
$$

Let $\vec F$ be a constant force.

If $t = i\tau$,

$$
\vec F_t=-\vec F_\tau
$$

$$
\vec F = {1 \over 4\pi\epsilon_0}\frac{q_1q_2}{r^2} \\
\vec F_t = -i\vec F_\tau \\
\vec F_t = -i\vec F_\tau \\
\vec F = -i{1 \over 4\pi\epsilon_0}\frac{q_1q_2}{r^2} \\
\vec F_t = -i\vec F_\tau \\
\vec F_t = -i\vec F_\tau \\
\vec F = -i{1 \over 4\pi\epsilon_0}\frac{q_1q_2}{r^2} \\
$$
