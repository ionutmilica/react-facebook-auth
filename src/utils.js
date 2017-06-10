/**
 * Encode object to url parameters
 *
 * @param object
 * @return {string}
 */
export function toQueryString(object) {
  return Object.keys(object)
    .map(key => `${key}=${encodeURIComponent(object[key])}`)
    .join('&');
}

/**
 * Check if device is mobile
 *
 * @return {boolean}
 */
export function isMobile() {
  try {
    return !!(
      (window.navigator && window.navigator.standalone) ||
      navigator.userAgent.match('CriOS') ||
      navigator.userAgent.match(/mobile/i)
    );
  } catch (ex) {
    return false;
  }
}
