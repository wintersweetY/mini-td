# mini-td

A cross-platform-ready tower defense starter focused on WeChat Mini Game first, with a platform adapter layer for future Douyin support.

## Current Status

This is an initialization scaffold with:
- WeChat-compatible entry (`game.js`, `game.json`, project config)
- Platform adapter abstraction (`js/platform`)
- Shared game domain skeleton (`js/core`)
- Basic render loop and HUD (`js/render`)
- Initial tower/enemy configuration modules (`js/config`)

## Architecture

```text
mini-td
├── game.js                       # runtime entry
├── game.json                     # game runtime settings
├── js
│   ├── main.js                   # composition root
│   ├── core                      # shared game logic (platform agnostic)
│   │   ├── entities
│   │   └── systems
│   ├── platform                  # platform-specific adapter layer
│   │   └── adapters
│   ├── render                    # canvas rendering logic
│   ├── config                    # static balancing/config data
│   ├── runtime                   # runtime constants/hooks
│   └── utils                     # utility helpers
├── images                        # visual assets
└── audio                         # sound assets
```

## Run Locally (WeChat DevTools)

1. Open WeChat DevTools.
2. Import this folder: `/Users/ganyu/workspace/personal/github/mini-td`.
3. Create or bind your Mini Game AppID.
4. Compile and run.

## Recommended Git Workflow

- Main branch: `main`
- Feature branches: `feat/<topic>`
- Fix branches: `fix/<topic>`
- Conventional commits:
  - `feat: ...`
  - `fix: ...`
  - `chore: ...`
  - `docs: ...`

## Next Milestones

1. Grid + path authoring
2. Enemy marching on path
3. Tower placement and target acquisition
4. Projectile and damage resolution
5. Wave progression and win/lose loop
6. UI + save data + ad/reward integration via platform adapter
