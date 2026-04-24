import { ENEMY_ARCHETYPES } from '../../config/enemies';

const ENEMY_SEQUENCE = ['grunt', 'runner', 'tank'];

export default class EnemyFactory {
  createForWave({ wave, startPoint, serial }) {
    const archetypeId = ENEMY_SEQUENCE[(wave + serial) % ENEMY_SEQUENCE.length];
    const archetype = ENEMY_ARCHETYPES[archetypeId];
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
