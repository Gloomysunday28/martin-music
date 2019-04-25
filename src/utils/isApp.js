/**
 * 判断当前页面位置是否在app内
 */
export function inApp () {
  let isBrowser = isHave('Browser')
  let isIphone = isHave('iPhone')
  if (!isIphone) {
    // 安卓
    let haveWeibo = isHave('Weibo')
    if (!isBrowser && !haveWeibo) {
      return true
    } else {
      return false
    }
  } else {
    // ios
    let haveQQ = isHave('QQ')
    let haveVersion = isHave('Version')
    let haveMicroMessenger = isHave('MicroMessenger')
    if (haveVersion || haveMicroMessenger || haveQQ || isBrowser) {
      return false
    } else {
      return true
    }
  }
}
function isHave (m) {
  let userAgent = navigator.userAgent
  if (userAgent.indexOf(m) === -1) {
    return false
  } else {
    return true
  }
}

export default inApp
