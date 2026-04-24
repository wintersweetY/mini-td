/**
 * 经济系统：只负责金币增减与校验，不关心来源（击杀、建造、奖励等）。
 */
export default class EconomySystem {
  /**
   * @param {{ initialGold?: number }} [options]
   */
  constructor({ initialGold = 0 } = {}) {
    this.gold = initialGold;
  }

  /**
   * 增加金币。
   * @param {number} value - 增加值（应为非负）
   */
  addGold(value) {
    this.gold += value;
  }

  /**
   * 尝试扣除金币。
   * @param {number} value - 扣除值（应为非负）
   * @returns {boolean} 扣费是否成功
   */
  spendGold(value) {
    if (this.gold < value) {
      return false;
    }

    this.gold -= value;
    return true;
  }
}
