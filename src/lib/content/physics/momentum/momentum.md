<script>
    import Elastic1 from './elastic1.svelte'
</script>

<!-- <Elastic1 /> -->

## Conservation of Momentum

Momentum turns out to be a very useful quantity of an object because of a law called the **conservation of momentum**. To show this, start by recalling that Newton's Third Law of motion says that all forces exist as pairs that are equal in magnitude and opposite in direction. Mathematically,

$$
\vec F_{12} = - \vec F_{21}
$$

Where $F_{12}$ is the force of object 1 on object 2, and vice versa. Now we can use this with Newton's Second law.

$$
\vec F_\text{net} = m\vec a
$$

We can cleverly manipulate this expression to involve momentum.

$$
\vec F_\text{net} = m\vec a = m {d\vec v \over dt} = {d(m\vec v) \over t} = {d\vec p \over dt}
$$

This shows that a force on an object directly causes a change in its momentum. Going back to Newton's Third Law, we can see that the change in momentum of one object always results in an equal and opposite change in momentum of the other opposite.

$$
\vec F_{12} = \boxed { {d \vec p_2 \over dt} = - {d \vec p_1 \over dt} } = -\vec F_{21}
$$

So, when two objects are in contact, they always transfer momentum between each other; momentum is neither created nor destroyed.

## Collisions

The law of conservation of momemtum is most useful when analyzing a collision between two or more objects. All collisions between objects conserve the total amount of momentum, so if we know the initial velocity and masses of objects, we can determine how the objects should move after a collision. However, not all collisions act exactly the same. A collision can either be **elastic** or **inelastic**, depending on whether **kinetic energy** is conserved.

<!-- You may be tempted to say that kinetic energy should always be conserved, due to the conservation of energy. However, during a collision kinetic energy could be transfered into many other types of energy, such as thermal, sound, or even potential energy. Momentum, however, is necessarily conserved, as the forces between two colliding objects are always equal and opposite. -->

### Elastic Collision

When analyzing collisions, it can often be difficult to determine the exact velocities of objects after the collision. While the conservation of momentum restricts the possible space, it often still leaves infinitely many possible velocities.

<!-- todo: some examples of different possibilites from a single initial velocity set -->

Collisions that are **elastic** (preserve kinetic energy) are usually the easiest to analyze, since they add an aditional restraint on the system. While it's unlikely that all kinetic energy is conserved in a real collision, these types of collisions are usually very good approximations of real life phenomena. For example, gas particles in a container tend to collide almost perfectly elastically.

<!-- elastic collision (gas containers) -->

Let's consider a specific example. Suppose two particles are travelling towards each other at velocities of $2 \frac ms$ and $-3 \frac ms$, and start $5 m$ away from each other.

## Impulse

It's often useful to know the net change in momentum after a collision. For this, we use a quantity called impulse, defined as the time integral of force over the course of the collision.

$$
\vec J = \int \vec F \, dt
$$

To see that this represents a change in momentum, let's go back to the momentum form of Newton's Second Law:

$$
\vec F = {d\vec p \over dt}
$$

Now multiply by $dt$ and integrate.

$$
\vec F \, dt = d \vec p \\
\int d\vec p = \int \vec F \, dt \\
\Delta p = \int \vec F \, dt = \vec J
$$
