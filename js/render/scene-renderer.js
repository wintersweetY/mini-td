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
    ctx.fillStyle = '#f0f4f8';
    ctx.font = '20px Arial';
    ctx.fillText(`Mini TD Prototype`, 16, 30);
    ctx.fillText(`State: ${snapshot.state}`, 16, 56);
    ctx.fillText(`Wave: ${snapshot.wave}`, 16, 82);
    ctx.fillText(`Life: ${snapshot.life}`, 16, 108);
    ctx.fillText(`Gold: ${snapshot.gold}`, 16, 134);
  }
}
