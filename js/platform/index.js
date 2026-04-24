import WechatAdapter from './adapters/wechat';
import FallbackAdapter from './adapters/fallback';

export function createPlatformBridge() {
  if (typeof wx !== 'undefined') {
    return new WechatAdapter(wx);
  }

  return new FallbackAdapter();
}
