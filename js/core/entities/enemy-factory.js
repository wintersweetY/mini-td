export default class EnemyFactory {
  createForWave(wave) {
    return {
      id: `enemy_${wave}_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      hp: 10 + wave * 2,
      speed: Math.min(1 + wave * 0.05, 3),
      reward: 5 + Math.floor(wave / 2)
    };
  }
}
