export default class BulletSystem {
  updateBullets({ bullets, enemies, deltaSeconds }) {
    const enemyById = new Map(enemies.map((enemy) => [enemy.id, enemy]));

    for (let i = bullets.length - 1; i >= 0; i -= 1) {
      const bullet = bullets[i];
      const target = enemyById.get(bullet.targetId);

      if (!target || target.hp <= 0 || target.hasReachedGoal) {
        bullets.splice(i, 1);
        continue;
      }

      const dx = target.x - bullet.x;
      const dy = target.y - bullet.y;
      const distance = Math.hypot(dx, dy);
      const step = bullet.speed * deltaSeconds;

      if (distance <= step + target.radius) {
        target.hp -= bullet.damage;
        bullets.splice(i, 1);
        continue;
      }

      const ratio = step / distance;
      bullet.x += dx * ratio;
      bullet.y += dy * ratio;
    }
  }
}
