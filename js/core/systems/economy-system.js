export default class EconomySystem {
  constructor({ initialGold = 0 } = {}) {
    this.gold = initialGold;
  }

  addGold(value) {
    this.gold += value;
  }

  spendGold(value) {
    if (this.gold < value) {
      return false;
    }

    this.gold -= value;
    return true;
  }
}
