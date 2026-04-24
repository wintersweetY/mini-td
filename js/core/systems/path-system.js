/**
 * 路径系统：负责把关卡网格坐标转换为渲染/碰撞使用的像素坐标。
 * 说明：
 * - 地图尺寸优先采用 level.map.cols / level.map.rows。
 * - 所有网格点（路径/塔位/堡垒）都会做边界校验，便于快速发现配置错误。
 */
export default class PathSystem {
  /**
   * @param {{ width:number, height:number, level:{gridSize:number, map?:{cols:number,rows:number}, pathCells:Array<{x:number,y:number}>, fortressCell?:{x:number,y:number}, towerSlots?:Array<{id:string,x:number,y:number}>} }} params
   */
  constructor({ width, height, level }) {
    this.width = width;
    this.height = height;
    this.level = level;

    this.gridSize = level.gridSize;
    this.bounds = this.resolveMapBounds(level);

    this.assertCellsInBounds(level.pathCells, 'pathCells');
    if (level.fortressCell) {
      this.assertCellsInBounds([level.fortressCell], 'fortressCell');
    }
    this.assertCellsInBounds(level.towerSlots || [], 'towerSlots');

    this.path = this.buildPath(level.pathCells);
    this.fortress = this.buildFortress(level.fortressCell || level.pathCells[level.pathCells.length - 1]);
    this.towerSlots = this.buildTowerSlots(level.towerSlots || []);
  }

  /**
   * 解析地图网格范围。
   * @param {any} level
   * @returns {{cols:number, rows:number}}
   */
  resolveMapBounds(level) {
    if (level.map && Number.isInteger(level.map.cols) && Number.isInteger(level.map.rows)) {
      return {
        cols: level.map.cols,
        rows: level.map.rows
      };
    }

    const maxX = level.pathCells.reduce((current, cell) => Math.max(current, cell.x), 0);
    const maxY = level.pathCells.reduce((current, cell) => Math.max(current, cell.y), 0);

    return {
      cols: maxX + 1,
      rows: maxY + 1
    };
  }

  /**
   * 校验网格坐标是否越界。
   * @param {Array<{x:number,y:number}>} cells
   * @param {string} fieldName
   */
  assertCellsInBounds(cells, fieldName) {
    for (const cell of cells) {
      if (
        !Number.isInteger(cell.x) ||
        !Number.isInteger(cell.y) ||
        cell.x < 0 ||
        cell.y < 0 ||
        cell.x >= this.bounds.cols ||
        cell.y >= this.bounds.rows
      ) {
        throw new Error(
          `${fieldName} 存在越界坐标: (${cell.x}, ${cell.y})，允许范围 x:[0, ${this.bounds.cols - 1}], y:[0, ${this.bounds.rows - 1}]`
        );
      }
    }
  }

  /**
   * 构建路径像素信息。
   * @param {Array<{x:number,y:number}>} pathCells
   */
  buildPath(pathCells) {
    const mapWidth = this.bounds.cols * this.gridSize;
    const mapHeight = this.bounds.rows * this.gridSize;

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
      gridSize: this.gridSize,
      cols: this.bounds.cols,
      rows: this.bounds.rows
    };
  }

  /**
   * 计算堡垒中心点像素坐标。
   * @param {{x:number,y:number}} fortressCell
   * @returns {{x:number,y:number}}
   */
  buildFortress(fortressCell) {
    return {
      x: this.path.offsetX + fortressCell.x * this.gridSize + this.gridSize / 2,
      y: this.path.offsetY + fortressCell.y * this.gridSize + this.gridSize / 2
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
