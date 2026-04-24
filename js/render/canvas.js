export function initCanvas(platform) {
  const localCanvas = platform.createCanvas();
  const windowInfo = platform.getWindowInfo();
  const globalScope =
    typeof GameGlobal !== 'undefined'
      ? GameGlobal
      : (globalThis.GameGlobal = {});

  localCanvas.width = windowInfo.screenWidth;
  localCanvas.height = windowInfo.screenHeight;

  globalScope.canvas = localCanvas;
  globalScope.screenWidth = windowInfo.screenWidth;
  globalScope.screenHeight = windowInfo.screenHeight;

  return localCanvas;
}
