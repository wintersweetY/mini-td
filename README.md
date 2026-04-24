# mini-td

一个面向“先微信、后多端”的塔防小游戏初始化工程，通过平台适配层为后续接入抖音小游戏预留扩展能力。

## 当前状态

当前已完成初始化骨架：
- 微信小游戏可运行入口（`game.js`、`game.json`、项目配置）
- 平台适配层抽象（`js/platform`）
- 共享核心逻辑骨架（`js/core`）
- 基础渲染循环与 HUD（`js/render`）
- 初始塔与敌人配置模块（`js/config`）

## 目录结构

```text
mini-td
├── game.js                       # 游戏运行入口
├── game.json                     # 游戏运行时配置
├── js
│   ├── main.js                   # 组装入口
│   ├── core                      # 共享核心逻辑（平台无关）
│   │   ├── entities
│   │   └── systems
│   ├── platform                  # 平台适配层
│   │   └── adapters
│   ├── render                    # Canvas 渲染逻辑
│   ├── config                    # 静态数值与配置
│   ├── runtime                   # 运行时常量与钩子
│   └── utils                     # 通用工具函数
├── images                        # 图片资源
└── audio                         # 音频资源
```

## 本地运行（微信开发者工具）

1. 打开微信开发者工具。
2. 导入目录：`/Users/ganyu/workspace/personal/github/mini-td`。
3. 创建或绑定小游戏 AppID。
4. 编译运行。

## Git 协作建议

- 主分支：`main`
- 功能分支：`feat/<topic>`
- 修复分支：`fix/<topic>`
- 提交规范（Conventional Commits）：
  - `feat: ...`
  - `fix: ...`
  - `chore: ...`
  - `docs: ...`

## 文档与注释规范

- 从现在开始，仓库内新增和修改的注释、设计文档、说明文档统一使用中文。

## 下一步里程碑

1. 网格与路径编辑
2. 敌人沿路径行进
3. 防御塔放置与索敌
4. 子弹与伤害结算
5. 波次推进与胜负循环
6. UI、存档与广告激励（通过平台适配层接入）
