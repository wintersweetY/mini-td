/**
 * 路径系统：负责把关卡网格坐标转换为渲染/碰撞使用的像素坐标。
 * 说明：
 * - 地图会在屏幕中居中（保留最小边距），保证不同分辨率下可见。
 */
export default class PathSystem {
  /**
   * @param {{ width:number, height:number, level:{gridSize:number, pathCells:Array<{x:number,y:number}>, towerSlots?:Array<{id:string,x:number,y:number}>} }} params
   */
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

  /**
   * 将塔位网格坐标转换为像素坐标。
   * @param {Array<{id:string,x:number,y:number}>} slots
   * @returns {Array<{id:string,x:number,y:number}>}
   */
  buildTowerSlots(slots) {
    return slots.map((slot) => ({
      id: slot.id,
      x: this.path.offsetX + slot.x * this.gridSize + this.gridSize / 2,
      y: this.path.offsetY + slot.y * this.gridSize + this.gridSize / 2
    }));
  }
}
