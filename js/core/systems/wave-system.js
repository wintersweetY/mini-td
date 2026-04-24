const SPAWN_INTERVAL = 45;
const WAVE_INTERVAL = 600;

export default class WaveSystem {
  shouldSpawnEnemy(frame) {
    return frame > 0 && frame % SPAWN_INTERVAL === 0;
  }

  shouldAdvanceWave(frame) {
    return frame > 0 && frame % WAVE_INTERVAL === 0;
  }
}
