export default class WechatAdapter {
  constructor(wxApi) {
    this.wx = wxApi;
  }

  createCanvas() {
    return this.wx.createCanvas();
  }

  getWindowInfo() {
    if (this.wx.getWindowInfo) {
      return this.wx.getWindowInfo();
    }

    return this.wx.getSystemInfoSync();
  }

  requestAnimationFrame(callback) {
    return requestAnimationFrame(callback);
  }

  cancelAnimationFrame(id) {
    cancelAnimationFrame(id);
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
