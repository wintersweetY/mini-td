/**
 * 防御塔系统：负责索敌与触发开火，不处理子弹飞行与命中。
 */
export default class TowerSystem {
  /**
   * @param {{
   *   towers:Array<any>,
   *   enemies:Array<any>,
   *   frame:number,
   *   spawnBullet:(bullet:{x:number,y:number,targetId:string,damage:number,speed:number,color:string,radius:number})=>void
   * }} params
   */
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

  /**
   * 选取目标：优先路径进度更靠后的敌人；同进度取更近者。
   * @param {any} tower
   * @param {Array<any>} enemies
   * @returns {any | null}
   */
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
