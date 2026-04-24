const SPAWN_INTERVAL_TICKS = 30;

export default class WaveSystem {
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

  resolveEnemies(count = 1) {
    this.resolvedInWave += count;
  }

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
