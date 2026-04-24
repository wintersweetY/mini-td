import WaveSystem from './systems/wave-system';
import EconomySystem from './systems/economy-system';
import EnemyFactory from './entities/enemy-factory';

export default class Game {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;

    this.frame = 0;
    this.state = 'idle';
    this.wave = 1;
    this.life = 20;

    this.economy = new EconomySystem({ initialGold: 200 });
    this.waveSystem = new WaveSystem();
    this.enemyFactory = new EnemyFactory();

    this.enemies = [];
  }

  start() {
    this.state = 'running';
  }

  update() {
    if (this.state !== 'running') {
      return;
    }

    this.frame += 1;

    const shouldSpawn = this.waveSystem.shouldSpawnEnemy(this.frame);
    if (shouldSpawn) {
      this.enemies.push(this.enemyFactory.createForWave(this.wave));
    }

    if (this.waveSystem.shouldAdvanceWave(this.frame)) {
      this.wave += 1;
      this.economy.addGold(25);
    }
  }

  getSnapshot() {
    return {
      state: this.state,
      frame: this.frame,
      wave: this.wave,
      life: this.life,
      gold: this.economy.gold,
      enemyCount: this.enemies.length
    };
  }
}
