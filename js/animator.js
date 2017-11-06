import { drawGrid } from "./grid-drawer";
import {ANIMATION_FPS} from './config';

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
      requestAnimationFrame(this._animate.bind(this));

      const now = Date.now();

      const elapsed = now - this.then;

      if (elapsed > this.fpsInteval) {
        this.then = now - elapsed % this.fpsInteval;

        const { value, done } = this.generator.next();
        this.done = done;
        if (!done) {
          drawGrid({
            ctx: this.ctx,
            grid: value
          });
        }
      }
    } else {
      console.log("animation complete");
    }
  }
}
