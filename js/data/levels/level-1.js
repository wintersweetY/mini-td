/**
 * 关卡 1 静态数据（MVP 固定地图）。
 * 说明：
 * 1. pathCells 与 towerSlots 使用网格坐标，实际像素坐标由 PathSystem 统一换算。
 * 2. presetTowers 用于快速形成可玩闭环（无交互时也能自动战斗）。
 * 3. 当前阶段未接入图片资源与地形贴图，地图由 render 层程序化绘制占位。
 */
export const LEVEL_1 = {
  id: 'level_1',
  name: '青草平原',
  gridSize: 48,
  pathCells: [
    { x: 0, y: 4 },
    { x: 4, y: 4 },
    { x: 4, y: 9 },
    { x: 9, y: 9 },
    { x: 9, y: 2 },
    { x: 14, y: 2 },
    { x: 14, y: 7 },
    { x: 18, y: 7 }
  ],
  towerSlots: [
    { id: 'slot_1', x: 2, y: 2 },
    { id: 'slot_2', x: 6, y: 6 },
    { id: 'slot_3', x: 7, y: 10 },
    { id: 'slot_4', x: 11, y: 4 },
    { id: 'slot_5', x: 12, y: 8 },
    { id: 'slot_6', x: 16, y: 5 }
  ],
  presetTowers: [
    { slotId: 'slot_1', type: 'arrow' },
    { slotId: 'slot_3', type: 'ice' },
    { slotId: 'slot_5', type: 'cannon' }
  ]
};
