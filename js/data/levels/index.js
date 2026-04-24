import { LEVEL_1 } from './level-1';

/**
 * 关卡注册表：后续新增关卡只需要在这里登记。
 */
export const LEVELS = {
  [LEVEL_1.id]: LEVEL_1
};

/**
 * 当前默认关卡。
 * 后续可接入选关 UI 或存档读取逻辑。
 */
export const DEFAULT_LEVEL_ID = LEVEL_1.id;

/**
 * 按 id 获取关卡配置。
 * @param {string} levelId
 */
export function getLevelById(levelId) {
  return LEVELS[levelId] || LEVEL_1;
}
