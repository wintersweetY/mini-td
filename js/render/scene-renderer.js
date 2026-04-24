import { GAME_TITLE } from '../runtime/constants';

const ENEMY_COLORS = {
  grunt: '#f97316',
  runner: '#60a5fa',
  tank: '#ef4444'
};

const TOWER_COLORS = {
  arrow: '#a3e635',
  cannon: '#f59e0b',
  ice: '#67e8f9'
};

/**
 * 场景渲染器：负责把快照状态绘制到 Canvas。
 * 说明：
 * - 当前全部图形为程序化占位绘制（色块/圆形/线条）。
 * - 待你后续提供图片资源后，可在本文件替换为贴图渲染，不影响 core 逻辑。
 */
export default class SceneRenderer {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
  }

  render(ctx, snapshot) {
    ctx.clearRect(0, 0, this.width, this.height);

    this.drawBackground(ctx);
    this.drawGrid(ctx, snapshot.path);
    this.drawPath(ctx, snapshot.path);
    this.drawTowerSlots(ctx, snapshot.towerSlots);
    this.drawTowers(ctx, snapshot.towers);
    this.drawBullets(ctx, snapshot.bullets);
    this.drawEnemies(ctx, snapshot.enemies);
    this.drawHud(ctx, snapshot);
    this.drawStateOverlay(ctx, snapshot);
  }

  drawBackground(ctx) {
    ctx.fillStyle = '#0b1f34';
    ctx.fillRect(0, 0, this.width, this.height);
  }

  drawGrid(ctx, path) {
    const cell = path.gridSize;
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
    ctx.lineWidth = 1;

    for (let x = path.offsetX; x <= path.offsetX + path.mapWidth; x += cell) {
      ctx.beginPath();
      ctx.moveTo(x, path.offsetY);
      ctx.lineTo(x, path.offsetY + path.mapHeight);
      ctx.stroke();
    }

    for (let y = path.offsetY; y <= path.offsetY + path.mapHeight; y += cell) {
      ctx.beginPath();
      ctx.moveTo(path.offsetX, y);
      ctx.lineTo(path.offsetX + path.mapWidth, y);
      ctx.stroke();
    }
  }

  drawPath(ctx, path) {
    if (!path.points || path.points.length === 0) {
      return;
    }

    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(path.points[0].x, path.points[0].y);

    for (let i = 1; i < path.points.length; i += 1) {
      ctx.lineTo(path.points[i].x, path.points[i].y);
    }

    ctx.stroke();

    ctx.strokeStyle = 'rgba(8, 47, 73, 0.55)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  /**
   * 绘制可建造塔位占位圈。
   */
  drawTowerSlots(ctx, slots) {
    for (const slot of slots) {
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(slot.x, slot.y, 16, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  /**
   * 绘制已建造塔体与范围圈。
   */
  drawTowers(ctx, towers) {
    for (const tower of towers) {
      const color = TOWER_COLORS[tower.type] || '#e2e8f0';

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  /**
   * 绘制子弹占位表现。
   */
  drawBullets(ctx, bullets) {
    for (const bullet of bullets) {
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * 绘制敌人与血条。
   */
  drawEnemies(ctx, enemies) {
    for (const enemy of enemies) {
      const color = ENEMY_COLORS[enemy.type] || '#f8fafc';

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
      ctx.fill();

      const barWidth = enemy.radius * 2;
      const hpRatio = enemy.maxHp > 0 ? enemy.hp / enemy.maxHp : 0;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(enemy.x - enemy.radius, enemy.y - enemy.radius - 8, barWidth, 4);

      ctx.fillStyle = '#22c55e';
      ctx.fillRect(
        enemy.x - enemy.radius,
        enemy.y - enemy.radius - 8,
        barWidth * hpRatio,
        4
      );
    }
  }

  /**
   * 绘制 HUD 信息。
   */
  drawHud(ctx, snapshot) {
    const stateMap = {
      running: '进行中',
      win: '胜利',
      lose: '失败',
      idle: '待开始'
    };

    ctx.fillStyle = '#f8fafc';
    ctx.font = '20px Arial';
    ctx.fillText(`${GAME_TITLE} 原型`, 16, 30);
    ctx.font = '18px Arial';
    ctx.fillText(`状态：${stateMap[snapshot.state] || snapshot.state}`, 16, 56);
    ctx.fillText(`波次：${snapshot.wave}/${snapshot.waveTotal}`, 16, 82);
    ctx.fillText(`刷怪：${snapshot.waveSpawned}/${snapshot.waveTarget}`, 16, 108);
    ctx.fillText(`生命：${snapshot.life}`, 16, 134);
    ctx.fillText(`金币：${snapshot.gold}`, 16, 160);
    ctx.fillText(`塔数：${snapshot.towers.length}  敌人：${snapshot.enemyCount}`, 16, 186);
    ctx.fillText(`提示：${snapshot.hintText}`, 16, 212);
  }

  /**
   * 胜负结算覆盖层。
   */
  drawStateOverlay(ctx, snapshot) {
    if (snapshot.state !== 'win' && snapshot.state !== 'lose') {
      return;
    }

    ctx.fillStyle = 'rgba(2, 6, 23, 0.66)';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '34px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(snapshot.state === 'win' ? '胜利' : '失败', this.width / 2, this.height / 2 - 12);
    ctx.font = '20px Arial';
    ctx.fillText('点击任意位置重新开始', this.width / 2, this.height / 2 + 24);
    ctx.textAlign = 'left';
  }
}
