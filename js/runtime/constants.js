export const GAME_TITLE = 'Mini TD';
export const TARGET_FPS = 60;
// 固定逻辑步长（毫秒）。核心系统统一按该步长更新，保证跨设备一致性。
export const FIXED_TIME_STEP_MS = 1000 / TARGET_FPS;
// 单帧 delta 上限（毫秒），用于限制后台恢复后的一次性时间跃迁。
export const MAX_FRAME_DELTA_MS = 100;
