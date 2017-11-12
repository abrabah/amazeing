import { drawPoint } from "./grid-drawer";
import { ANIMATION_FPS } from "./config";

export class Animator {
  constructor({ generator, ctx }) {
    this.generator = generator;
    this.ctx = ctx;
    this.done = false;
  }

  animate() {
    this.fpsInteval = 1000 / ANIMATION_FPS;
    this.then = Date.now();
    this._animate();
  }

  _animate() {
    if (!this.done) {
      const now = Date.now();

      const elapsed = now - this.then;

      if (elapsed > this.fpsInteval) {
        this.then = now - elapsed % this.fpsInteval;

        const { value, done } = this.generator.next();
        this.done = done;
        if (!done) {
          drawPoint({
            ctx: this.ctx,
            points: value
          });
        }
      }
      requestAnimationFrame(this._animate.bind(this));
    } else {
      console.log("animation complete");
    }
  }

  skipAnimation() {
    const points = [];

    while (!this.done) {
      const { value, done } = this.generator.next();
      if (!done) {
        points.push(...value);
      }
      this.done = done;
    }
    drawPoint({
      ctx: this.ctx,
      points
    });

    console.log("animation complete");
  }
}
