import { createPlatformBridge } from './platform';
import { initCanvas } from './render/canvas';
import SceneRenderer from './render/scene-renderer';
import Game from './core/game';

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

    this.loop = this.loop.bind(this);
    this.start();
  }

  start() {
    this.game.start();
    this.aniId = this.platform.requestAnimationFrame(this.loop);
  }

  loop() {
    this.game.update();
    this.renderer.render(this.ctx, this.game.getSnapshot());
    this.aniId = this.platform.requestAnimationFrame(this.loop);
  }
}
