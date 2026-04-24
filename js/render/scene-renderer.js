export default class SceneRenderer {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
  }

  render(ctx, snapshot) {
    ctx.clearRect(0, 0, this.width, this.height);

    this.drawBackground(ctx);
    this.drawGrid(ctx);
    this.drawHud(ctx, snapshot);
  }

  drawBackground(ctx) {
    ctx.fillStyle = '#102a43';
    ctx.fillRect(0, 0, this.width, this.height);
  }

  drawGrid(ctx) {
    const cell = 48;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= this.width; x += cell) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }

    for (let y = 0; y <= this.height; y += cell) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
  }

  drawHud(ctx, snapshot) {
    const stateText = snapshot.state === 'running' ? '进行中' : '待开始';

    ctx.fillStyle = '#f0f4f8';
    ctx.font = '20px Arial';
    ctx.fillText(`迷你塔防原型`, 16, 30);
    ctx.fillText(`状态：${stateText}`, 16, 56);
    ctx.fillText(`波次：${snapshot.wave}`, 16, 82);
    ctx.fillText(`生命：${snapshot.life}`, 16, 108);
    ctx.fillText(`金币：${snapshot.gold}`, 16, 134);
  }
}
