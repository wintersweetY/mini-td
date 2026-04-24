const SPAWN_INTERVAL_TICKS = 30;

/**
 * 波次系统：管理当前波次、刷怪进度与关卡完成状态。
 * 约定：
 * - “resolved”表示该波敌人已被处理（到终点或被击杀）。
 * - 每波敌人数采用基础线性增长，后续可替换为关卡配置表。
 */
export default class WaveSystem {
  /**
   * @param {{ totalWaves?: number }} [options]
   */
  constructor({ totalWaves = 10 } = {}) {
    this.totalWaves = totalWaves;
    this.currentWave = 1;
    this.spawnedInWave = 0;
    this.resolvedInWave = 0;
    this.finished = false;
  }

  start() {
    this.currentWave = 1;
    this.spawnedInWave = 0;
    this.resolvedInWave = 0;
    this.finished = false;
  }

  getEnemyCountForWave(wave = this.currentWave) {
    return 6 + (wave - 1) * 2;
  }

  /**
   * 波次逐帧更新。
   * @param {number} frame - 当前逻辑帧
   * @param {() => void} spawnEnemy - 触发一次刷怪的回调
   */
  update(frame, spawnEnemy) {
    if (this.finished) {
      return;
    }

    const enemyCount = this.getEnemyCountForWave(this.currentWave);
    const isSpawnTick = frame > 0 && frame % SPAWN_INTERVAL_TICKS === 0;

    if (isSpawnTick && this.spawnedInWave < enemyCount) {
      spawnEnemy();
      this.spawnedInWave += 1;
    }

    if (this.resolvedInWave >= enemyCount) {
      this.advanceWave();
    }
  }

  /**
   * 记录已结算敌人数。
   * @param {number} [count=1]
   */
  resolveEnemies(count = 1) {
    this.resolvedInWave += count;
  }

  /**
   * 进入下一波；若达到总波次则标记 finished。
   */
  advanceWave() {
    if (this.currentWave >= this.totalWaves) {
      this.finished = true;
      return;
    }

    this.currentWave += 1;
    this.spawnedInWave = 0;
    this.resolvedInWave = 0;
  }
}
