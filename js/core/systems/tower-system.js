export default class TowerSystem {
  updateTowers({ towers, enemies, frame, spawnBullet }) {
    for (const tower of towers) {
      if (frame - tower.lastAttackFrame < tower.attackInterval) {
        continue;
      }

      const target = this.selectTarget(tower, enemies);
      if (!target) {
        continue;
      }

      tower.lastAttackFrame = frame;
      spawnBullet({
        x: tower.x,
        y: tower.y,
        targetId: target.id,
        damage: tower.damage,
        speed: tower.bulletSpeed,
        color: tower.bulletColor,
        radius: tower.bulletRadius
      });
    }
  }

  selectTarget(tower, enemies) {
    let chosen = null;

    for (const enemy of enemies) {
      if (enemy.hp <= 0 || enemy.hasReachedGoal) {
        continue;
      }

      const dx = enemy.x - tower.x;
      const dy = enemy.y - tower.y;
      const distance = Math.hypot(dx, dy);

      if (distance > tower.range) {
        continue;
      }

      if (!chosen) {
        chosen = { enemy, distance };
        continue;
      }

      const isFurtherProgress = enemy.waypointIndex > chosen.enemy.waypointIndex;
      const isCloser = distance < chosen.distance;

      if (isFurtherProgress || (enemy.waypointIndex === chosen.enemy.waypointIndex && isCloser)) {
        chosen = { enemy, distance };
      }
    }

    return chosen ? chosen.enemy : null;
  }
}
