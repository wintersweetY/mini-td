export function initCanvas(platform) {
  const localCanvas = platform.createCanvas();
  const windowInfo = platform.getWindowInfo();
  const runtimeGlobal =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : typeof global !== 'undefined'
          ? global
          : {};
  const globalScope =
    typeof GameGlobal !== 'undefined'
      ? GameGlobal
      : (runtimeGlobal.GameGlobal = {});

  localCanvas.width = windowInfo.screenWidth;
  localCanvas.height = windowInfo.screenHeight;

  globalScope.canvas = localCanvas;
  globalScope.screenWidth = windowInfo.screenWidth;
  globalScope.screenHeight = windowInfo.screenHeight;

  return localCanvas;
}
