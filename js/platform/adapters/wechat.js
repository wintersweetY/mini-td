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
}
