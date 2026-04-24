/**
 * 防御塔配置表。
 * 说明：
 * 1. 配置为“塔基础属性”，升级曲线将在后续阶段追加。
 * 2. 数值单位：
 *    - cost：建造消耗金币
 *    - damage：单发伤害
 *    - range：攻击范围（像素）
 *    - attackInterval：攻击间隔（逻辑帧，60fps 下每帧约 16.67ms）
 */
export const TOWER_CONFIG = {
  arrow: {
    id: 'arrow',
    cost: 100,
    damage: 8,
    range: 120,
    attackInterval: 40
  },
  cannon: {
    id: 'cannon',
    cost: 140,
    damage: 14,
    range: 90,
    attackInterval: 55
  },
  ice: {
    id: 'ice',
    cost: 130,
    damage: 5,
    range: 110,
    attackInterval: 45,
    slowFactor: 0.75
  }
};
