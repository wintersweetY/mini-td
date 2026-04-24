export default class PathSystem {
  constructor({ width, height, level }) {
    this.width = width;
    this.height = height;
    this.level = level;

    this.gridSize = level.gridSize;
    this.path = this.buildPath(level.pathCells);
    this.towerSlots = this.buildTowerSlots(level.towerSlots || []);
  }

  buildPath(pathCells) {
    const maxX = pathCells.reduce((current, cell) => Math.max(current, cell.x), 0);
    const maxY = pathCells.reduce((current, cell) => Math.max(current, cell.y), 0);
    const mapWidth = (maxX + 1) * this.gridSize;
    const mapHeight = (maxY + 1) * this.gridSize;

    const offsetX = Math.max((this.width - mapWidth) / 2, this.gridSize * 0.5);
    const offsetY = Math.max((this.height - mapHeight) / 2, this.gridSize * 0.5);

    const points = pathCells.map((cell) => ({
      x: offsetX + cell.x * this.gridSize + this.gridSize / 2,
      y: offsetY + cell.y * this.gridSize + this.gridSize / 2
    }));

    return {
      points,
      offsetX,
      offsetY,
      mapWidth,
      mapHeight,
      gridSize: this.gridSize
    };
  }

  buildTowerSlots(slots) {
    return slots.map((slot) => ({
      id: slot.id,
      x: this.path.offsetX + slot.x * this.gridSize + this.gridSize / 2,
      y: this.path.offsetY + slot.y * this.gridSize + this.gridSize / 2
    }));
  }
}
