import { createPlatformBridge } from './platform/index';
import { initCanvas } from './render/canvas';
import SceneRenderer from './render/scene-renderer';
import Game from './core/game';
import { FIXED_TIME_STEP_MS, MAX_FRAME_DELTA_MS } from './runtime/constants';

export default class Main {
  constructor() {
    this.platform = createPlatformBridge();
    this.canvas = initCanvas(this.platform);
    this.ctx = this.canvas.getContext('2d');

    this.game = new Game({
      width: this.canvas.width,
      height: this.canvas.height
    });

    this.renderer = new SceneRenderer({
      width: this.canvas.width,
      height: this.canvas.height
    });

    this.lastTime = 0;
    this.accumulator = 0;
    this.loop = this.loop.bind(this);

    this.start();
  }

  start() {
    this.game.start();
    this.lastTime = 0;
    this.accumulator = 0;
    this.aniId = this.platform.requestAnimationFrame(this.loop);
  }

  loop() {
    const now = this.platform.now();

    if (this.lastTime === 0) {
      this.lastTime = now;
    }

    const deltaMs = Math.min(now - this.lastTime, MAX_FRAME_DELTA_MS);
    this.lastTime = now;
    this.accumulator += deltaMs;

    while (this.accumulator >= FIXED_TIME_STEP_MS) {
      this.game.update(FIXED_TIME_STEP_MS / 1000);
      this.accumulator -= FIXED_TIME_STEP_MS;
    }

    this.renderer.render(this.ctx, this.game.getSnapshot());
    this.aniId = this.platform.requestAnimationFrame(this.loop);
  }
}
