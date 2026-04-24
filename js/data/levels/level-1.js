/**
 * 关卡 1（竖屏模板）。
 * 调整路径时优先改本文件：
 * 1. map.cols / map.rows：定义地图网格尺寸（x/y 的取值范围）
 * 2. pathCells：按顺序定义路径拐点
 * 3. fortressCell：终点堡垒格子（通常等于 pathCells 最后一个点）
 */
export const LEVEL_1 = {
  id: 'level_1',
  name: '北境防线',
  gridSize: 48,
  map: {
    // 竖屏建议：横向少、纵向多。
    cols: 9,  // x: 0 ~ 8
    rows: 16  // y: 0 ~ 15
  },
  pathCells: [
    // 右下角出生，按“-|-”路线推进到左上角。
    { x: 8, y: 15 },
    { x: 4, y: 15 },
    { x: 4, y: 3 },
    { x: 0, y: 3 },
    { x: 0, y: 0 }
  ],
  fortressCell: { x: 0, y: 0 },
  towerSlots: [
    { id: 'slot_1', x: 7, y: 14 },
    { id: 'slot_2', x: 5, y: 12 },
    { id: 'slot_3', x: 3, y: 10 },
    { id: 'slot_4', x: 6, y: 8 },
    { id: 'slot_5', x: 2, y: 6 },
    { id: 'slot_6', x: 1, y: 2 }
  ],
  presetTowers: [
    { slotId: 'slot_1', type: 'arrow' },
    { slotId: 'slot_3', type: 'ice' }
  ]
};
