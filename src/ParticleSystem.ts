interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    ax?: number;
    ay?: number;
    life: number;
    size: number;
    color: Color;
    compute?: (p: Particle) => void;
}

class ParticleSystem {

    particles: Array<Particle> = [];

    step(p5: any) {
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                i--;
            } else {
                p5.noStroke();
                p5.fill(p5.color(particle.color.r, particle.color.g, particle.color.b, particle.color.a));
                p5.square(particle.x, particle.y, particle.size);
                particle.life--;
                particle.x += particle.vx;
                particle.y += particle.vy;
                if (particle.ax) particle.vx += particle.ax;
                if (particle.ay) particle.vy += particle.ay;
                if (particle.compute) particle.compute(particle);
            }
        }
    }

    add(particle: Particle) {
        this.particles.push(particle);
    }
}