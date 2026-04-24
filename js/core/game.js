import { LEVEL_1 } from '../data/levels/level-1';
import { TOWER_CONFIG } from '../config/towers';
import WaveSystem from './systems/wave-system';
import EconomySystem from './systems/economy-system';
import EnemyFactory from './entities/enemy-factory';
import PathSystem from './systems/path-system';
import EnemySystem from './systems/enemy-system';
import TowerSystem from './systems/tower-system';
import BulletSystem from './systems/bullet-system';

const INITIAL_GOLD = 420;

/**
 * 游戏聚合根（核心主循环协调器）。
 * 职责：
 * 1. 组织各系统更新顺序（刷怪 -> 塔开火 -> 子弹命中 -> 敌人结算 -> 胜负判定）。
 * 2. 维护跨系统共享状态（life、wave、gold、实体容器）。
 * 3. 对渲染层输出只读快照（snapshot）。
 *
 * 资源说明：
 * - 当前版本仅提供逻辑与程序化占位渲染，不依赖图片/音频资源文件。
 * - 后续接入你提供的美术和音频时，仅替换 render/platform 层，不改 core 规则。
 */
export default class Game {
  /**
   * @param {{ width:number, height:number }} params
   */
  constructor({ width, height }) {
    this.width = width;
    this.height = height;

    this.frame = 0;
    this.state = 'idle';
    this.life = 20;

    this.level = LEVEL_1;
    this.pathSystem = new PathSystem({ width, height, level: this.level });

    this.economy = new EconomySystem({ initialGold: INITIAL_GOLD });
    this.waveSystem = new WaveSystem({ totalWaves: 10 });
    this.enemyFactory = new EnemyFactory();
    this.enemySystem = new EnemySystem({ pathPoints: this.pathSystem.path.points });
    this.towerSystem = new TowerSystem();
    this.bulletSystem = new BulletSystem();

    this.enemies = [];
    this.bullets = [];
    this.towers = [];
    this.enemySerial = 0;
    this.bulletSerial = 0;
  }

  start() {
    this.frame = 0;
    this.state = 'running';
    this.life = 20;
    this.enemies = [];
    this.bullets = [];
    this.towers = [];
    this.enemySerial = 0;
    this.bulletSerial = 0;
    this.economy = new EconomySystem({ initialGold: INITIAL_GOLD });
    this.waveSystem.start();

    this.bootstrapPresetTowers();
  }

  /**
   * 根据关卡预设放置初始塔，用于快速形成可玩闭环。
   */
  bootstrapPresetTowers() {
    for (const towerSpec of this.level.presetTowers || []) {
      this.placeTower(towerSpec.slotId, towerSpec.type);
    }
  }

  /**
   * 在指定塔位建造防御塔。
   * @param {string} slotId
   * @param {'arrow'|'cannon'|'ice'} type
   * @returns {boolean} 是否放置成功（失败通常为塔位无效/已占用/金币不足）
   */
  placeTower(slotId, type) {
    const slot = this.pathSystem.towerSlots.find((item) => item.id === slotId);
    const config = TOWER_CONFIG[type];

    if (!slot || !config) {
      return false;
    }

    const occupied = this.towers.some((tower) => tower.slotId === slotId);
    if (occupied) {
      return false;
    }

    if (!this.economy.spendGold(config.cost)) {
      return false;
    }

    this.towers.push({
      id: `tower_${slotId}_${type}`,
      type,
      slotId,
      x: slot.x,
      y: slot.y,
      range: config.range,
      damage: config.damage,
      attackInterval: config.attackInterval,
      bulletSpeed: type === 'cannon' ? 360 : 420,
      bulletRadius: type === 'cannon' ? 5 : 4,
      bulletColor: type === 'ice' ? '#67e8f9' : type === 'cannon' ? '#f59e0b' : '#f8fafc',
      lastAttackFrame: -9999
    });

    return true;
  }

  /**
   * 核心逻辑更新（固定时间步长驱动）。
   * @param {number} deltaSeconds - 逻辑步长（秒）
   */
  update(deltaSeconds) {
    if (this.state !== 'running') {
      return;
    }

    this.frame += 1;

    this.waveSystem.update(this.frame, () => {
      this.enemySerial += 1;
      this.enemies.push(
        this.enemyFactory.createForWave({
          wave: this.waveSystem.currentWave,
          startPoint: this.pathSystem.path.points[0],
          serial: this.enemySerial
        })
      );
    });

    // 顺序约束：塔先决定是否开火，再由子弹系统推进与命中。
    this.towerSystem.updateTowers({
      towers: this.towers,
      enemies: this.enemies,
      frame: this.frame,
      spawnBullet: ({ x, y, targetId, damage, speed, color, radius }) => {
        this.bulletSerial += 1;
        this.bullets.push({
          id: `bullet_${this.bulletSerial}`,
          x,
          y,
          targetId,
          damage,
          speed,
          color,
          radius
        });
      }
    });

    this.bulletSystem.updateBullets({
      bullets: this.bullets,
      enemies: this.enemies,
      deltaSeconds
    });

    // 敌人系统负责移除“到点/死亡”的敌人，并返回结算结果。
    const { escapedCount, defeatedRewards } = this.enemySystem.updateEnemies(
      this.enemies,
      deltaSeconds
    );

    if (escapedCount > 0) {
      this.life -= escapedCount;
      this.waveSystem.resolveEnemies(escapedCount);
    }

    if (defeatedRewards.length > 0) {
      for (const reward of defeatedRewards) {
        this.economy.addGold(reward);
      }
      this.waveSystem.resolveEnemies(defeatedRewards.length);
    }

    if (this.life <= 0) {
      this.life = 0;
      this.state = 'lose';
      return;
    }

    if (this.waveSystem.finished && this.enemies.length === 0) {
      this.state = 'win';
    }
  }

  /**
   * 输出渲染快照，避免 render 层直接读写核心状态。
   */
  getSnapshot() {
    const wave = this.waveSystem.currentWave;
    const waveTarget = this.waveSystem.getEnemyCountForWave(wave);

    return {
      state: this.state,
      frame: this.frame,
      wave,
      waveTotal: this.waveSystem.totalWaves,
      waveSpawned: this.waveSystem.spawnedInWave,
      waveTarget,
      life: this.life,
      gold: this.economy.gold,
      enemyCount: this.enemies.length,
      path: this.pathSystem.path,
      towerSlots: this.pathSystem.towerSlots,
      towers: this.towers.map((tower) => ({
        x: tower.x,
        y: tower.y,
        range: tower.range,
        type: tower.type
      })),
      bullets: this.bullets.map((bullet) => ({
        x: bullet.x,
        y: bullet.y,
        radius: bullet.radius,
        color: bullet.color
      })),
      enemies: this.enemies.map((enemy) => ({
        x: enemy.x,
        y: enemy.y,
        hp: enemy.hp,
        maxHp: enemy.maxHp,
        radius: enemy.radius,
        type: enemy.type
      }))
    };
  }
}
