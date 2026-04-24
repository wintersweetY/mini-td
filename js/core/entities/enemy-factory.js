import { ENEMY_ARCHETYPES } from '../../config/enemies';

const ENEMY_SEQUENCE = ['grunt', 'runner', 'tank'];

/**
 * 敌人工厂：将“波次信息 + 原型配置”转换为运行时敌人实体。
 */
export default class EnemyFactory {
  /**
   * @param {{ wave: number, startPoint: {x:number, y:number}, serial: number }} params
   * @returns {{
   *   id: string, type: string, maxHp: number, hp: number, speed: number,
   *   reward: number, radius: number, x: number, y: number,
   *   waypointIndex: number, hasReachedGoal: boolean
   * }}
   */
  createForWave({ wave, startPoint, serial }) {
    const archetypeId = ENEMY_SEQUENCE[(wave + serial) % ENEMY_SEQUENCE.length];
    const archetype = ENEMY_ARCHETYPES[archetypeId];
    // MVP 先使用线性+轻指数混合增长，后续可迁移到独立数值曲线表。
    const hpScale = 1 + (wave - 1) * 0.18;
    const speedScale = 1 + (wave - 1) * 0.04;

    return {
      id: `enemy_${wave}_${serial}_${Date.now()}`,
      type: archetypeId,
      maxHp: Math.round(archetype.baseHp * hpScale),
      hp: Math.round(archetype.baseHp * hpScale),
      speed: archetype.baseSpeed * 46 * speedScale,
      reward: Math.round(archetype.baseReward + wave * 0.5),
      radius: archetypeId === 'tank' ? 14 : 11,
      x: startPoint.x,
      y: startPoint.y,
      waypointIndex: 1,
      hasReachedGoal: false
    };
  }
}
