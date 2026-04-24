export default class FallbackAdapter {
  createCanvas() {
    if (typeof document !== 'undefined') {
      const node = document.createElement('canvas');
      document.body.appendChild(node);
      return node;
    }

    throw new Error('未检测到可用的 Canvas 运行环境。');
  }

  getWindowInfo() {
    if (typeof window !== 'undefined') {
      return {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
      };
    }

    return { screenWidth: 375, screenHeight: 667 };
  }

  requestAnimationFrame(callback) {
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      return window.requestAnimationFrame(callback);
    }

    return setTimeout(callback, 16);
  }

  cancelAnimationFrame(id) {
    if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
      window.cancelAnimationFrame(id);
      return;
    }

    clearTimeout(id);
  }

  now() {
    return Date.now();
  }

  vibrateShort() {}
}
