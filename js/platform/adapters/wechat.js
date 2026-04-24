export default class WechatAdapter {
  constructor(wxApi) {
    this.wx = wxApi;
  }

  createCanvas() {
    if (this.wx.createCanvas) {
      return this.wx.createCanvas();
    }

    if (typeof canvas !== 'undefined') {
      return canvas;
    }

    throw new Error('微信环境未提供 Canvas。');
  }

  getWindowInfo() {
    if (this.wx.getWindowInfo) {
      return this.wx.getWindowInfo();
    }

    return this.wx.getSystemInfoSync();
  }

  requestAnimationFrame(callback) {
    if (this.wx.requestAnimationFrame) {
      return this.wx.requestAnimationFrame(callback);
    }

    if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame(callback);
    }

    return setTimeout(callback, 16);
  }

  cancelAnimationFrame(id) {
    if (this.wx.cancelAnimationFrame) {
      this.wx.cancelAnimationFrame(id);
      return;
    }

    if (typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(id);
      return;
    }

    clearTimeout(id);
  }

  now() {
    return Date.now();
  }

  vibrateShort(type = 'light') {
    if (this.wx.vibrateShort) {
      this.wx.vibrateShort({ type });
    }
  }

  /**
   * 绑定点击/触摸事件（微信小游戏环境）。
   * @param {HTMLCanvasElement} _canvas
   * @param {(point:{x:number,y:number})=>void} handler
   * @returns {() => void} 解除绑定函数
   */
  bindTap(_canvas, handler) {
    if (!this.wx.onTouchStart) {
      return () => {};
    }

    const listener = (event) => {
      const touch =
        (event.touches && event.touches[0]) ||
        (event.changedTouches && event.changedTouches[0]);

      if (!touch) {
        return;
      }

      handler({
        x: touch.clientX ?? touch.pageX ?? 0,
        y: touch.clientY ?? touch.pageY ?? 0
      });
    };

    this.wx.onTouchStart(listener);

    return () => {
      if (this.wx.offTouchStart) {
        this.wx.offTouchStart(listener);
      }
    };
  }
}
