# mini-td 项目技能说明

## 适用场景

当需求涉及以下内容时，优先遵循本技能：
- 修改 `mini-td` 代码结构或功能逻辑
- 新增平台能力（微信/抖音适配）
- 调整数值、波次、塔和敌人的配置
- 新增或修改项目文档、注释、工程规范

## 目标

在不破坏当前架构的前提下，持续推进“平台适配层 + 共享核心逻辑”方案：
- `core` 只放平台无关的游戏规则和系统
- `platform` 只放平台差异能力
- `render` 只负责表现层绘制

## 强制约束

1. 注释与文档统一使用中文。
2. 涉及多端能力时，禁止在 `core` 直接调用 `wx.*` 或 `tt.*`。
3. 新增逻辑优先放到系统模块（`js/core/systems`），避免把流程硬编码在入口。
4. 改动后必须同步更新相关文档（至少包含 `README.md` 或本技能引用文档）。
5. 提交信息遵循 Conventional Commits（如 `feat:`、`fix:`、`docs:`、`chore:`）。

## 工作流程

1. 先阅读：
   - `skills/mini-td/references/code-structure.md`
   - `skills/mini-td/references/dev-checklist.md`
2. 再实施改动：优先小步提交，保证每步可运行、可验证。
3. 完成后自检：
   - 是否触碰平台边界
   - 是否补充中文注释/文档
   - 是否同步里程碑状态

## 参考资料

- 代码结构与职责：`skills/mini-td/references/code-structure.md`
- 开发检查清单：`skills/mini-td/references/dev-checklist.md`
- 当前里程碑路线：`skills/mini-td/references/roadmap.md`
