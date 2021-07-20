import UAParser from 'ua-parser-js'

const uaParser = new UAParser()

export const getOs = () => {
  uaParser.setUA(window.navigator.userAgent)
  return uaParser.getOS()
}

export const isIOS = () => {
  return getOs().name === 'iOS'
}

export const isAndroid = () => {
  return getOs().name === 'Android'
}

export const isMobile = () => {
  return isIOS() || isAndroid()
}
