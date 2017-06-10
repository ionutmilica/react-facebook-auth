import { toQueryString, isMobile } from '../utils';

describe('Utils', () => {
  describe('toQueryString', () => {
    it('handles empty object', () => {
      expect(toQueryString({})).toEqual('');
    });
    it('handles object with one property', () => {
      expect(toQueryString({ page: 1 })).toEqual('page=1');
    });
    it('handles object with >= 2 properties', () => {
      expect(toQueryString({ page: 1, q: 'my search', utf8: 'yes' })).toEqual(
        'page=1&q=my%20search&utf8=yes',
      );
    });
  });

  describe('isMobile', () => {
    const navigator = {
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
    };
    global.window = { navigator };
    global.navigator = navigator;
    expect(isMobile()).toEqual(true);
  });
});
