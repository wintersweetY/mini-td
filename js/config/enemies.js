/**
 * 敌人原型配置。
 * 说明：
 * 1. 本文件只维护“基础模板值”，具体波次成长在 EnemyFactory 中计算。
 * 2. 数值单位：
 *    - baseHp：生命值（点）
 *    - baseSpeed：基础速度系数（无单位，最终会换算成像素/秒）
 *    - baseReward：击杀奖励金币（点）
 */
export const ENEMY_ARCHETYPES = {
  grunt: {
    id: 'grunt',
    baseHp: 12,
    baseSpeed: 1.1,
    baseReward: 6
  },
  runner: {
    id: 'runner',
    baseHp: 7,
    baseSpeed: 1.6,
    baseReward: 5
  },
  tank: {
    id: 'tank',
    baseHp: 26,
    baseSpeed: 0.7,
    baseReward: 10
  }
};
