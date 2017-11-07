import { drawPoint } from "./grid-drawer";
import { ANIMATION_FPS } from "./config";

export class Animator {
  constructor() {
    this.done = false;
  }

  animate({ generator, ctx }) {
    this.generator = generator;
    this.ctx = ctx;
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
}
