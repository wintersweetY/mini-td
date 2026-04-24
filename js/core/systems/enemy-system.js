export default class EnemySystem {
  constructor({ pathPoints }) {
    this.pathPoints = pathPoints;
  }

  updateEnemies(enemies, deltaSeconds) {
    let escapedCount = 0;
    const defeatedRewards = [];

    for (const enemy of enemies) {
      this.moveEnemy(enemy, deltaSeconds);

      if (enemy.hasReachedGoal) {
        escapedCount += 1;
      }
    }

    for (let i = enemies.length - 1; i >= 0; i -= 1) {
      if (enemies[i].hasReachedGoal) {
        enemies.splice(i, 1);
        continue;
      }

      if (enemies[i].hp <= 0) {
        defeatedRewards.push(enemies[i].reward);
        enemies.splice(i, 1);
      }
    }

    return {
      escapedCount,
      defeatedRewards
    };
  }

  moveEnemy(enemy, deltaSeconds) {
    if (enemy.hasReachedGoal || enemy.waypointIndex >= this.pathPoints.length) {
      enemy.hasReachedGoal = true;
      return;
    }

    let remainingDistance = enemy.speed * deltaSeconds;

    while (remainingDistance > 0 && enemy.waypointIndex < this.pathPoints.length) {
      const target = this.pathPoints[enemy.waypointIndex];
      const dx = target.x - enemy.x;
      const dy = target.y - enemy.y;
      const distanceToTarget = Math.hypot(dx, dy);

      if (distanceToTarget === 0) {
        enemy.waypointIndex += 1;
        continue;
      }

      if (distanceToTarget <= remainingDistance) {
        enemy.x = target.x;
        enemy.y = target.y;
        enemy.waypointIndex += 1;
        remainingDistance -= distanceToTarget;
      } else {
        const ratio = remainingDistance / distanceToTarget;
        enemy.x += dx * ratio;
        enemy.y += dy * ratio;
        remainingDistance = 0;
      }
    }

    if (enemy.waypointIndex >= this.pathPoints.length) {
      enemy.hasReachedGoal = true;
    }
  }
}
