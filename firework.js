// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

class Firework {
  constructor() {
    this.hu = random(360); // Sử dụng dải màu rộng hơn
    this.firework = new Particle(random(width * 0.1, width * 0.9), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
    this.shape = int(random(3)); // 0: tròn, 1: sao, 2: trái tim
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    let n = 100;
    for (let i = 0; i < n; i++) {
      let angle = map(i, 0, n, 0, TWO_PI);
      let p;
      if (this.shape === 1) { // Star
        let r = random(2) > 1 ? 1.5 : 1;
        p = new Particle(
          this.firework.pos.x + cos(angle) * 8 * r,
          this.firework.pos.y + sin(angle) * 8 * r,
          this.hu,
          false,
          angle,
          r * random(2, 5)
        );
      } else if (this.shape === 2) { // Heart
        let t = angle;
        let x = 16 * pow(sin(t), 3);
        let y = -13 * cos(t) + 5 * cos(2 * t) + 2 * cos(3 * t) + cos(4 * t);
        p = new Particle(
          this.firework.pos.x + x * 2,
          this.firework.pos.y + y * 2,
          this.hu,
          false,
          angle,
          random(2, 4)
        );
      } else { // Circle
        p = new Particle(
          this.firework.pos.x,
          this.firework.pos.y,
          this.hu,
          false,
          angle,
          random(2, 5)
        );
      }
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
